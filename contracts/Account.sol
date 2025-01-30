// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Account {
    uint64 private id;
    string private name;

    constructor(uint64 _id, string memory _name) {
        id = _id;
        name = _name;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function setName(string memory _name) public {
        name = _name;
    }

}