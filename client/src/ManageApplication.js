import { ethers } from 'ethers';
import { manageApplicationContractAbi, manageApplicationContractAdress } from './constant/manageApplicationsConstant';
import { manageAccountContractAdress, manageAccountContractAbi } from './constant/manageAccountConstant';
import { useManageJob } from './ManageJob';

export const useManageApplication = () => {
    let lastBlock = null;

    const {
        retriveJobDetails
    } = useManageJob();

    function getManageApplicationContract() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(
            manageApplicationContractAdress,
            manageApplicationContractAbi,
            signer
        );
    }

    function getManageAccountContract() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(
            manageAccountContractAdress,
            manageAccountContractAbi,
            signer
        );
    }

    async function handleApplication(jobId) {
        const contract = getManageApplicationContract();

        try {
            await contract.addApplication(jobId);
        } 
        catch (error) {
            console.error("Error:", error);
        }
    }

    async function checkIfHasApplied(jobId) {
        const contract = getManageApplicationContract();
        
        try {
            const hasApplied = await contract.checkHasApplied(jobId);
            return hasApplied;
        } 
        catch (error) {
            console.error("Error:", error);
        }
        return false;
    }

    async function parseApplicants(applicants) {
        let res = [];
        const contract = getManageAccountContract();
        for(let i = 0; i < applicants[0].length; i++) {
            const [id, name, email, phoneNumber, link] = await contract.getUserAccountDetailsByAddress(applicants[0][i]);
            const applicationId = applicants[1][i];
            const status = applicants[2][i];
            res.push({id, name, email, phoneNumber, link, applicationId, status});
        }

        return res;

    }

    async function getApplicantsByjobId(jobId) {
        const contract =  getManageApplicationContract();
        if(jobId == null) return;
        try {
            const applicants = await contract.getAllApplicantsByJob(jobId);
            const res = await parseApplicants(applicants);
            return res;
        }
        catch (error){
            console.error("Error:", error);
        }
        return [];
    }

    async function parseApplications(applications) {
        let res = [];
        for(let i = 0; i < applications[0].length; i++) {
           let job = await retriveJobDetails(applications[0][i]);
           job.status = applications[1][i];
           res.push(job);
        }
        return res;
    }

    async function getApplications() {
        const contract =  getManageApplicationContract();
        try {
            const applications = await contract. getApplications();
            const res = await parseApplications(applications);
            return res;
        }
        catch (error){
            console.error("Error:", error);
        }
        return [];
    }

    async function acceptApplicant(applicationId) {
        const contract = getManageApplicationContract();

        try {
            await contract.acceptApplication(applicationId);
        }
        catch (error){
            console.error("Error:", error);
        }
    }


    async function rejectApplicant(applicationId) {
        const contract = getManageApplicationContract();

        try {
            await contract.rejectApplication(applicationId);
        }
        catch (error){
            console.error("Error:", error);
        }
    }

    const listenForEventApplication = async() => {
        const contract = getManageApplicationContract();
        contract.on("StateChanged", async()  => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const currentBlock = await provider.getBlockNumber();
            if(lastBlock !== null && currentBlock > lastBlock) {
                localStorage.setItem("needsReload", "true");
            }
            
            lastBlock = currentBlock;
        });
    }

    return {
        handleApplication,
        checkIfHasApplied,
        getApplicantsByjobId,
        acceptApplicant,
        rejectApplicant,
        getApplications,
        listenForEventApplication
    };

};