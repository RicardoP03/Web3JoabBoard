import { ethers } from 'ethers';
import { manageAccountContractAbi, manageAccountContractAdress } from './constant/manageAccountConstant';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


export const useManageAccount = () => {
    const [accountExists, setAccountExists] = useState(false);
    const [isUserAccount, setIsUserAccount] = useState(false);
    const [accountDetails, setAccountDetails] = useState(null);
    const navigate = useNavigate;

    function getManageAccountContract() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(
            manageAccountContractAdress,
            manageAccountContractAbi,
            signer
        );
    }


    async function getAccountStatus() {
        try {
            const contract = getManageAccountContract();
            const accountStatus = await  contract.checkAccountExists();
            return accountStatus;
        }
        catch (error) {
            console.error("Error calling smart contract:", error);
        }
    }

    async function checkIsUserAccount() {
        try {
            const contract = getManageAccountContract();
            const accountStatus = await contract.checkUserAccount();
            return accountStatus;
        }
        catch (error) {
            console.error("Error calling smart contract:", error);
        }
    }



    const handleUserAccountData = async (data) => {
        const { name, email, phone } = data;
        const contract = getManageAccountContract();

        try {
            if(!accountExists) {
                await contract.createUserAccount(name, email, phone);
                await updateUserDetails();
            }
            else {
                await contract.setUserAccountDetails(name, email, phone);
                await updateUserDetails();
            }
            navigate("/");
        } 
        catch (error) {
            console.error("Error during account update process:", error);
        }
    };

    const handleCompanyAccountData = async (data) => {
        const { name, description } = data;
        const contract = getManageAccountContract();

        try {
            if(!accountExists) {
                await contract.createCompanyAccount(name, description);
                await updateUserDetails();
            }
            else {
                await contract.setCompanyAccountDetails(name, description);
                await updateUserDetails();
            }

            navigate("/");
        } 
        catch (error) {
            console.error("Error during account update process:", error);
        }
    }

    const updateUserDetails = async () => {
        const accountStatus = await getAccountStatus();
        setAccountExists(accountStatus);
        const isUser = await checkIsUserAccount();
        setIsUserAccount(isUser);
        if(!accountStatus) setAccountDetails(null);
        else {
            if(isUser) {
                const contract = getManageAccountContract();
                const [id, name, email, phoneNumber] = await contract.getUserAccountDetails();
                setAccountDetails({id, name, email, phoneNumber});
            }
            else {
                const contract = getManageAccountContract();
                const [id, name, description] = await contract.getCompanyAccountDetails();
                setAccountDetails({id, name, description});
            }
        }
    }

    return {
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
    };
};