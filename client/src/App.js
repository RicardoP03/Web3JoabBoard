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
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

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
        updateUserDetails
    } = useManageAccount();

    const {
        getAllActiveJobs,
        getAllActiveJobsByCompany,
        handleJobData,
        retriveJobDetails,
        checkIsYourJob
    } = useManageJob();

    const {
        handleApplication,
        checkIfHasApplied,
        getApplicantsByjobId,
        acceptApplicant,
        rejectApplicant,
        getApplications
    } = useManageApplication();

    async function connectToMetamask() {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                console.log("Metamask Connected : " + address);
                setIsConnected(true);
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

    async function handleAccountsChanged(accounts) {
        //reset everything
        setIsConnected(false);
        setAccount(null);
        setAccountExists(false);
        setIsUserAccount(false);
        setAccountDetails(null);
    }

    if(!isConnected)  {
        return (
            <Router>
                <Routes>
                    <Route index element = {<LoginPage connectWallet = {connectToMetamask}/>}/>
                    <Route path = "*" element = {<NotFound isUserAccount = {isUserAccount} noAccount = {true}/>}/>
                </Routes>
            </Router>
        )
    }

    if(!accountExists) {
        return (
            <Router>
                <Routes>
                    <Route index element = {<FirstLogin/>}/>
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
