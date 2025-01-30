import { ethers } from 'ethers';
import { manageApplicationContractAbi, manageApplicationContractAdress } from './constant/manageApplicationsConstant';
import { manageAccountContractAdress, manageAccountContractAbi } from './constant/manageAccountConstant';
import { manageJobContractAbi, manageJobContractAdress} from './constant/manageJobConstant';
import React from 'react';

export const useManageApplication = () => {

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

    function getManageJobContract() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(
            manageJobContractAdress,
            manageJobContractAbi,
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
            const [id, name, email, phoneNumber] = await contract.getUserAccountDetailsByAddress(applicants[0][i]);
            const applicationId = applicants[1][i];
            res.push({id, name, email, phoneNumber, applicationId});
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

    return {
        handleApplication,
        checkIfHasApplied,
        getApplicantsByjobId
    };

};