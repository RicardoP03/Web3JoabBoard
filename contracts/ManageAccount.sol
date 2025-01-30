// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./User.sol";
import "./Company.sol"; 

contract ManageAccount {
    mapping(address => uint64) private accounts;
    mapping(uint64 => Company) private companyes;
    mapping(uint64 => User) private users;

    uint64 private idCounter = 1;

    modifier validName(string memory _name) {
        require(bytes(_name).length <= 100, "The name maximum length is 100 characters.");
        require(checkName(_name), "The name can only contain letters, spaces and '-' characters and must not be empty.");
        _;
    }

    modifier validEmail(string memory _email) {
        require(bytes(_email).length <= 100, "The email maximum length is 100 characters.");
        require(checkEmail(_email), "The email must be an valid one.");
        _;
    }


    function createUserAccount(string memory _name, string memory _email, string memory _phoneNumber) public {
        accounts[msg.sender] = idCounter;
        users[idCounter] = new User(idCounter, _name, _email, _phoneNumber);
        idCounter++;
    }

    function createCompanyAccount(string memory _name, string memory _description) public {
        accounts[msg.sender] = idCounter;
        companyes[idCounter] = new Company(idCounter, _name, _description);
        idCounter++;
    }

    function checkAccountExists() public view returns(bool) {
        return  accounts[msg.sender] != 0;
    }

    function checkAccountExistsByAdress(address adr) public view returns(bool) {
        return  accounts[adr] != 0;
    }

    function checkUserAccount() public view returns(bool) {
        return address(users[accounts[msg.sender]]) != address(0);
    }

    function checkUserAccountByAdress(address adr) public view returns(bool) {
        return address(users[accounts[adr]]) != address(0);
    }

    function checkCompanyAccount() public view returns(bool) {
        return address(companyes[accounts[msg.sender]]) != address(0);
    }

    function checkCompanyAccountByAdress(address adr) public view returns(bool) {
        return address(companyes[accounts[adr]]) != address(0);
    }

    function getCompanyAccountDetails() public view returns (uint64, string memory name, string memory description) {
        uint64 id = accounts[msg.sender];
        if(address(companyes[accounts[msg.sender]]) == address(0)) return (0, "", "");
        Company c = companyes[id];
        return (id, c.getName(), c.getDescription());
    }
    

    function getUserAccountDetails() public view returns(uint64, string memory, string memory, string memory) {
        uint64 id = accounts[msg.sender];
        if(address(users[accounts[msg.sender]]) == address(0)) return (0, "", "", "");
        User u = users[id];
        return (id, u.getName(), u.getEmail(), u.getPhoneNumber());
    }

    function getUserAccountDetailsByAddress(address adr) public view returns(uint64, string memory, string memory, string memory) {
        uint64 id = accounts[adr];
        if(address(users[accounts[adr]]) == address(0)) return (0, "", "", "");
        User u = users[id];
        return (id, u.getName(), u.getEmail(), u.getPhoneNumber());
    }

    function getCompanyID(address adr) public view returns (uint64) {
        return accounts[adr];
    }

    function setCompanyAccountDetails(string memory _name, string memory _description) public {
        uint64 id = accounts[msg.sender];
        Company c = companyes[id];
        c.setName(_name);
        c.setDescription(_description);
    }

    function getCompanyDescriptionById(uint64 id) public view returns (string memory) {
        Company c = companyes[id];
        return c.getDescription();
    }

    function setUserAccountDetails(string memory _name, string memory _email, string memory _phoneNumber) public {
        uint64 id = accounts[msg.sender];
        User u = users[id];
        u.setName(_name);
        u.setEmail(_email);
        u.setPhoneNumber(_phoneNumber);
    }

    function eraseUserAccountByAddress(address adr) public {
        uint64 userId = accounts[adr];
        delete users[userId];
        delete accounts[adr];
    }

    function eraseCompanyAccountByAddress(address adr) public {
        uint64 companyId = accounts[adr];
        delete companyes[companyId];
        delete accounts[adr];
    }

    function checkName(string memory _name) public pure returns (bool) {
        bytes memory nameBytes = bytes(_name); 
        bool hasLetters = false;

        for (uint i = 0; i < nameBytes.length; i++) {
            bytes1 char = nameBytes[i];
            if((char >= 0x41 && char <= 0x5A) || (char >= 0x61 && char <= 0x7A)) hasLetters = true;
            else if(char != 0x2D && char != 0x20) return false;
        }

        return hasLetters;
    }

     function checkEmail(string memory email) public pure returns (bool) {
        //email must have format a@b.c and no white spaces;

        bytes memory emailBytes = bytes(email);
        uint len = emailBytes.length;

        bool hasAtSymbol = false;
        bool hasDotSymbol = false;
        for(uint i = 0; i < len; i++) {
            if(emailBytes[i] == 0x20 || emailBytes[i] == 0x0A || emailBytes[i] == 0x0D || emailBytes[i] == 0x09) {
                return false;
            }

            if(emailBytes[i] == '@') {
                hasAtSymbol = true;
            }

            if(emailBytes[i] == '.' && hasAtSymbol) {
                hasDotSymbol = true;
            }    
        }

        return hasAtSymbol && hasDotSymbol;
    }
}
