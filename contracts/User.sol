// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Account.sol";

contract User is Account {
    string private  email;
    string private  phoneNumber;

    constructor(uint64 _id, string memory _name, string memory _email, string memory _phoneNumber)
        Account(_id, _name) 
    {
        email = _email;
        phoneNumber = _phoneNumber;
    }

    function getEmail() public view returns (string memory) {
        return email;
    }

    function setEmail(string memory _email) public {
         email = _email;
    }

    function getPhoneNumber() public view returns (string memory) {
        return phoneNumber;
    }

    function setPhoneNumber(string memory _phoneNumber) public {
         phoneNumber = _phoneNumber;
    }

}