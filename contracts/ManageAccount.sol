// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./User.sol";
import "./Company.sol"; 

contract ManageAccount {
    mapping(address => uint64) private accounts;
    mapping(uint64 => Company) private companyes;
    mapping(uint64 => User) private users;

    uint64 private idCounter = 1;
    event StateChanged();

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

    modifier validLink(string memory _link) {
        require(bytes(_link).length <= 200, "The link must have ar most 200 characters");
        _;
    }

    modifier validDescription(string memory _desc) {
        require(bytes(_desc).length <= 1000, "The description must have ar most 1000 characters");
        _;
    }

    modifier validPhoneNumber(string memory _number) {
        require(bytes(_number).length <= 25, "The phone number must have ar most 25 characters");
        require(checkPhoneNumber(_number), "The number must be an valid format");
        _;
    }


    function createUserAccount(string memory _name, string memory _email, string memory _phoneNumber, string memory _link) 
    public validName(_name) validEmail(_email) validPhoneNumber(_phoneNumber) validLink(_link) {
        accounts[msg.sender] = idCounter;
        users[idCounter] = new User(idCounter, _name, _email, _phoneNumber, _link);
        idCounter++;
        emit StateChanged();
    }

    function createCompanyAccount(string memory _name, string memory _description) 
    public validName(_name) validDescription(_description) {
        accounts[msg.sender] = idCounter;
        companyes[idCounter] = new Company(idCounter, _name, _description);
        idCounter++;
        emit StateChanged();
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
    

    function getUserAccountDetails() public view returns(uint64, string memory, string memory, string memory, string memory) {
        uint64 id = accounts[msg.sender];
        if(address(users[accounts[msg.sender]]) == address(0)) return (0, "", "", "", "");
        User u = users[id];
        return (id, u.getName(), u.getEmail(), u.getPhoneNumber(), u.getLink());
    }

    function getUserAccountDetailsByAddress(address adr) public view returns(uint64, string memory, string memory, string memory, string memory) {
        uint64 id = accounts[adr];
        if(address(users[accounts[adr]]) == address(0)) return (0, "", "", "",  "");
        User u = users[id];
        return (id, u.getName(), u.getEmail(), u.getPhoneNumber(), u.getLink());
    }

    function getCompanyID(address adr) public view returns (uint64) {
        return accounts[adr];
    }

    function setCompanyAccountDetails(string memory _name, string memory _description) 
    public validName(_name) validDescription(_description) {
        uint64 id = accounts[msg.sender];
        Company c = companyes[id];
        c.setName(_name);
        c.setDescription(_description);
        emit StateChanged();
    }

    function getCompanyNameAndDescriptionById(uint64 id) public view returns (string memory, string memory) {
        Company c = companyes[id];
        return (c.getName(), c.getDescription());
    }

    function setUserAccountDetails(string memory _name, string memory _email, string memory _phoneNumber, string memory _link) 
    public validName(_name) validEmail(_email) validPhoneNumber(_phoneNumber) validLink(_link) {
        uint64 id = accounts[msg.sender];
        User u = users[id];
        u.setName(_name);
        u.setEmail(_email);
        u.setPhoneNumber(_phoneNumber);
        u.setLink(_link);
        emit StateChanged();
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

        for (uint i = 0; i < nameBytes.length; i++) {
            bytes1 char = nameBytes[i];
            if((char >= 0x41 && char <= 0x5A) || (char >= 0x61 && char <= 0x7A)) continue;
            else if(char != 0x2D && char != 0x20) return false;
        }

        return true;
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

    function checkPhoneNumber(string memory number) public pure returns (bool) {
        bytes memory numberBytes = bytes(number);
        uint len = numberBytes.length;

        for(uint i = 0; i < len; i++) {
            if(numberBytes[i] == '+' || numberBytes[i] == ' ' || numberBytes[i] == '-' || numberBytes[i] == '(' || numberBytes[i] == ')') continue;
            else if(numberBytes[i] >= '0' && numberBytes[i] <= '9') continue;
            else return false;
        }

        return true;
    }
}
