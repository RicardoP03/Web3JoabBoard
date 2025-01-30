// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Account.sol";

contract Company is Account {
    string private  description;

    constructor(uint64 _id, string memory _name, string memory _description)
        Account(_id, _name) 
    {
        description = _description;
    }


    function getDescription() public view returns (string memory) {
        return description;
    }

    function setDescription(string memory _description) public {
         description = _description;
    }
}