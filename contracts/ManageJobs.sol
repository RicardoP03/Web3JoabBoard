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

    modifier validName(string memory _name) {
        require(bytes(_name).length <= 100, "The name maximum length is 100 characters.");
        require(checkName(_name), "The name can only contain letters, spaces and '-' characters and must not be empty.");
        _;
    }

    modifier validDescription(string memory _desc) {
        require(bytes(_desc).length <= 5000, "The description must have ar most 5000 characters");
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
    public isCompanyAccount(msg.sender) validName(_jobTitle) validName(_city) validName(_country) validDescription(_description)
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
    public isYourJob(oldJobId) validName(_jobTitle) validName(_city) validName(_country) validDescription(_description)
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

    function checkName(string memory _name) public pure returns (bool) {
        bytes memory nameBytes = bytes(_name); 

        for (uint i = 0; i < nameBytes.length; i++) {
            bytes1 char = nameBytes[i];
            if((char >= 0x41 && char <= 0x5A) || (char >= 0x61 && char <= 0x7A)) continue;
            else if(char != 0x2D && char != 0x20) return false;
        }

        return true;
    }
}