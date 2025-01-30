// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ManageAccount.sol";

contract ManageJob {

    ManageAccount manageAccount;

    event JobAdded(uint64 indexed jobId, uint64 indexed companyID, string jobTitle, string city, string country, string description);
    event JobClosed(uint64 indexed  jobId);
    event JobModified(uint64 indexed jobId);

    modifier isCompanyAccount(address adr) {
        require(manageAccount.checkAccountExistsByAdress(adr), "You haven't created an account yet.");
        require(manageAccount.checkCompanyAccountByAdress(adr), "Only companies can add jobs.");
        _;
    }

    modifier isYourJob(uint64 jobId) {
        require(checkIfIsYourJob(jobId), "This is not your job, you can't change it.");
        _;
    }

    uint64 private  jobCounter = 1;

    mapping(uint64 => address) private  companyJobs;

    constructor(address _manageAccountAddress) {
        manageAccount = ManageAccount(_manageAccountAddress);
    }

    function checkIfIsYourJob(uint64 jobId) public view returns(bool) {
        if(companyJobs[jobId] != msg.sender) return false;
        return true;
    }

    function addJob(string memory _jobTitle, string memory _city, string memory _country, string memory _description) 
        public isCompanyAccount(msg.sender) 
    {
        uint64 companyID = manageAccount.getCompanyID(msg.sender);
        uint64 jobId = jobCounter;
        companyJobs[jobId] = msg.sender;
        jobCounter++;
        emit JobAdded(jobId, companyID, _jobTitle, _city, _country, _description);
    }

    function closeJob(uint64 jobId) public
        isYourJob(jobId)    
    {
        emit JobClosed(jobId);
    }

    function changeJob(uint64 oldJobId, string memory _jobTitle, string memory _city, string memory _country, string memory _description) 
        public isYourJob(oldJobId)
    {   
        emit JobModified(oldJobId);
        uint64 jobId = jobCounter;
        companyJobs[jobId] = msg.sender;
        jobCounter++;
        uint64 companyID = manageAccount.getCompanyID(msg.sender);
        emit JobAdded(jobId, companyID, _jobTitle, _city, _country, _description);
    }

    function jobExists(uint64 jobId) public view returns (bool) {
        return companyJobs[jobId] != address(0);
    }
}