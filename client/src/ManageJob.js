import { ethers } from 'ethers';
import { manageJobContractAbi, manageJobContractAdress } from './constant/manageJobConstant';
import { useNavigate } from 'react-router-dom';

export const useManageJob = () => {
    const navigate = useNavigate;

    function getManageJobContract() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(
            manageJobContractAdress,
            manageJobContractAbi,
            signer
        );
    }

    async function parseJobEvents(events) {
        const jobs = events.map(event => ({
            jobId: event.args[0],
            companyId: event.args[1],
            jobTitle: event.args[2],
            city: event.args[3],
            country: event.args[4],
            description: event.args[5]
        }));
        return jobs;
    } 

    async function getJobAddedEvents(contract) {
        const filter = contract.filters.JobAdded();
        const events = await contract.queryFilter(filter, 0, 'latest');
        return events;
    }

    async function getJobAddedEventsByCompanyId(companyId, contract) {
        const filter = contract.filters.JobAdded(null, companyId);
        const events = await contract.queryFilter(filter, 0, 'latest');
        return events;
    }

    async function  getJobModifiedEvents(contract) {
        const filter = contract.filters.JobModified();
        const events = await contract.queryFilter(filter, 0, 'latest');
        return events;
    }

    async function  getJobClosedEvents(contract) {
        const filter = contract.filters.JobClosed();
        const events = await contract.queryFilter(filter, 0, 'latest');
        return events;
    }

    async function getClosedAndModifiedJobIds(contract) {
        const jobClosedEvents = await getJobClosedEvents(contract);
        const jobModifiedEvents = await getJobModifiedEvents(contract);
        const closedAndModifiedJobIds = new Set([
            ...jobClosedEvents.map(event => event.args[0]),
            ...jobModifiedEvents.map(event => event.args[0]),
        ]);
        
        return closedAndModifiedJobIds;
    }

    async function filterActiveJobs(events, contract) {    
        const closedAndModifiedJobIds = await getClosedAndModifiedJobIds(contract);
        const filteredJobs = events.filter(event => {
            return !closedAndModifiedJobIds.has(event.args[0]);
        });
        return filteredJobs;
    }

    async function getAllActiveJobs() {
        const contract = getManageJobContract();
        const events = await getJobAddedEvents(contract);
        const filteredEvents = await filterActiveJobs(events, contract);
        const jobs = await parseJobEvents(filteredEvents);
        return jobs;
    }

    async function getAllActiveJobsByCompany(id) {
        if(id == null) return [];
        const contract = getManageJobContract();
        const events = await getJobAddedEventsByCompanyId(id, contract)
        const filteredEvents = await filterActiveJobs(events, contract);
        const jobs = await parseJobEvents(filteredEvents);
        return jobs;
    }

    async function retriveJobDetails(jobId) {
        const contract = getManageJobContract();
        const filter = contract.filters.JobAdded(jobId, null);
        const events = await contract.queryFilter(filter, 0, 'latest');
        const jobs = await parseJobEvents(events);
        if(jobs.length == 0) return null;
        return jobs[0];
    }

    const handleJobData = async (data) => {
        const { jobTitle, city, country, description } = data;
        const contract = getManageJobContract();

        try {
            await contract.addJob(jobTitle, city, country, description);
            navigate("/myJobs");
        } 
        catch (error) {
            console.error("Error during account update process:", error);
        }
    };

    
    async function checkIsYourJob(jobId) {
        const contract =  getManageJobContract();
        if(jobId == null) return false;

        try {
            const canAccess = await contract.checkIfIsYourJob(jobId);
            return canAccess
        }
        catch (error){
            console.error("Error:", error);
        }
        return false;
    }

    return {
        getAllActiveJobs,
        getAllActiveJobsByCompany,
        handleJobData,
        retriveJobDetails,
        checkIsYourJob
    }
}