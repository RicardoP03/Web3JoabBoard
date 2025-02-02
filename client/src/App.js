import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ethers } from 'ethers';
import { useManageAccount } from './ManageAccount';
import { useManageJob } from './ManageJob';
import { useManageApplication } from './ManageApplication';

import CreateCompanyAccountPage from './pages/CreateCompanyAccountPage';
import CreateUserAccountPage from './pages/CreateUserAccountPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SettingPage from './pages/SettingPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import FirstLogin from './pages/FirstLogin';
import JobsPage from './pages/JobsPage';
import MyJobsApplications from './pages/MyJobsApplications';
import MyJobsPage from './pages/MyJobsPage';
import CreateJobPage from './pages/CreateJobPage';
import ShowJob from './pages/ShowJob';
import ShowApplicants from './pages/ShowApplicants';
import './App.css';


function App() {
    const [account, setAccount] = useState(null);
    const [needReload, setNeedReload] = useState(false);

    const {
        accountExists,
        setAccountExists,
        isUserAccount,
        setIsUserAccount,
        accountDetails,
        setAccountDetails,
        getAccountStatus,
        checkIsUserAccount,
        handleUserAccountData,
        handleCompanyAccountData,
        updateUserDetails,
        listenForEventAccounts
    } = useManageAccount();

    const {
        getAllActiveJobs,
        getAllActiveJobsByCompany,
        handleJobData,
        retriveJobDetails,
        checkIsYourJob,
        listenForEventJob
    } = useManageJob();

    const {
        handleApplication,
        checkIfHasApplied,
        getApplicantsByjobId,
        acceptApplicant,
        rejectApplicant,
        getApplications,
        listenForEventApplication
    } = useManageApplication();

    async function connectToMetamask() {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                await updateUserDetails();

            } 
            catch (err) {
                console.error(err);
            }
        } 
        
        else {
            console.error("Metamask is not detected in the browser")
        }
    }

    useEffect(() => {
        connectToMetamask();
    }, []);

    useEffect( () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged)
        }

        return() => {
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            }
        }
    })

    useEffect(() => {
        const interval = setInterval( async() => {
            await listenForEventAccounts();
            await listenForEventJob();
            await listenForEventApplication();
            if(localStorage.getItem("needsReload") === "true") {
                localStorage.setItem("needsReload", "false");
                setNeedReload(true);
            }
        }, 2000);
    
        return () => clearInterval(interval);
    }, []); 

    useEffect(() => {
        if(needReload) {
            window.location.reload();
            setNeedReload(false);
        }
    }, [needReload])

    async function handleAccountsChanged(accounts) {
        connectToMetamask();
    }

    if(!accountExists) {
        return (
            <Router>
                <Routes>
                    <Route index element = {<LoginPage/>}/>
                    <Route path = "/FirstLogin" element = {<FirstLogin/>}/>
                    <Route path = "/CreateUserAccount" element = {<CreateUserAccountPage onSubmit = {handleUserAccountData}/>}/>
                    <Route path = "/CreateCompanyAccount" element = {<CreateCompanyAccountPage onSubmit = {handleCompanyAccountData}/>}/>
                    <Route path = "*" element = {<NotFound isUserAccount = {isUserAccount} noAccount = {true}/>}/>
                </Routes>
            </Router>
        )
    }
    
    return (
        <Router>
            <Routes>
                <Route index element = {<HomePage account = {account} isUserAccount = {isUserAccount}/>}/>
                <Route path = "/about" element = {<AboutPage isUserAccount = {isUserAccount}/>}/>
                <Route path = "/settings" element = {<SettingPage onSubmit = {isUserAccount? handleUserAccountData : handleCompanyAccountData}
                                                                  isUserAccount = {isUserAccount}
                                                                  accountDetails = {accountDetails}/>}/>
                <Route path = "/jobs" element = {<JobsPage isUserAccount = {isUserAccount} jobsList = {getAllActiveJobs()}/>}/> 
                <Route path = "/myJobs" element = {<MyJobsPage isUserAccount = {isUserAccount} 
                                                              jobsList = {accountDetails? getAllActiveJobsByCompany(accountDetails.id) : []}/>}/>     
                <Route path = "/myJobsApplications" element = {<MyJobsApplications isUserAccount = {isUserAccount} 
                                                                                   applicationsPromise = {getApplications()}/>}/>  
                <Route path = "/createAnJob" element = {<CreateJobPage isUserAccount = {isUserAccount} onSubmit = {handleJobData} />}/> 
                <Route path="/showJob/:id" element = {<ShowJob isUserAccount = {isUserAccount} 
                                                               getData = {retriveJobDetails} 
                                                               checkIfHasApplied = {checkIfHasApplied}
                                                               handleApplication = {handleApplication}
                                                               checkIsYourJob = {checkIsYourJob}/>}/>  
                <Route path="/showApplicants/:id" element = {<ShowApplicants isUserAccount = {isUserAccount}  
                                                            getApplicants = {getApplicantsByjobId } 
                                                            checkIsYourJob = {checkIsYourJob}
                                                            acceptApplicant = {acceptApplicant}
                                                            rejectApplicant = {rejectApplicant}/>}/>                                                                                
                <Route path = "*" element = {<NotFound isUserAccount = {isUserAccount} noAccount = {false}/>}/>                             
            </Routes>
        </Router>
    )
}

export default App;
