// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ManageAccount.sol";
import "./ManageJobs.sol";

contract ManageApplications {
    ManageAccount manageAccount;
    ManageJob manageJob;

    struct Application {
        uint64 id;
        uint64 jobId;
        address user;
        uint8 status;
    }

    uint64 private idCounter = 1;

    mapping(uint64 => Application) public  applications;
    mapping(uint64 => uint64[]) public applicationsByJobId;
    mapping(address => mapping(uint64 => bool)) public hasAppliedToJob;
    mapping(address => uint64[]) public applicationsList;

    constructor(address _manageAccountAddress, address _manageJobAddress) {
        manageAccount = ManageAccount(_manageAccountAddress);
        manageJob = ManageJob(_manageJobAddress);
    }

    modifier isUser() {
        require(manageAccount.checkUserAccountByAdress(msg.sender), "The name maximum length is 100 characters.");
        _;
    }

    modifier hasNotApplied(uint64 jobId) {
        require(!checkHasApplied(jobId), "You've already applied.");
        _;
    }

    modifier jobExists(uint64 jobId) {
        require(manageJob.jobExists(jobId), "The job dosen't exist.");
        _;
    }

    function addApplication(uint64 jobId) 
        public isUser() hasNotApplied(jobId) jobExists(jobId)
    {   
        Application memory newApplication = Application(idCounter, jobId, msg.sender, 0);
        applications[newApplication.id] = newApplication;
        applicationsByJobId[jobId].push(newApplication.id);
        hasAppliedToJob[msg.sender][jobId] = true;
        applicationsList[msg.sender].push(idCounter);
        idCounter++;
    }

    function rejectApplication(uint64 applicationId) public {
        applications[applicationId].status = 2;
    }

    function acceptApplication(uint64 applicationId) public {
        applications[applicationId].status = 1;
    }

    function checkHasApplied(uint64 jobId) public view returns (bool) {
        return  hasAppliedToJob[msg.sender][jobId];
    }

    function getAllApplicantsByJob(uint64 jobId) public view returns (address[] memory, uint64[] memory) {
        uint64[] memory applicationIds = applicationsByJobId[jobId];
        address[] memory applicants = new address[](applicationIds.length);

        for (uint i = 0; i < applicationIds.length; i++) {
            applicants[i] = applications[applicationIds[i]].user;
        }

        return (applicants, applicationIds);
    }


     function getApplications() public view returns (uint64[] memory, uint8[] memory) {
        uint64[] memory appList = applicationsList[msg.sender];
        uint64[] memory jobIds = new uint64[](appList.length);
        uint8[] memory statuses = new uint8[](appList.length);

        for (uint i = 0; i < appList.length; i++) {
            jobIds[i] = applications[appList[i]].jobId;
            statuses[i] =  applications[appList[i]].status;
        }

        return (jobIds, statuses);
    }

}