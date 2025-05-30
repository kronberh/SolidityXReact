// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract Counter {
    uint count = 0;

    function setCounter(uint _count) public {
        count = _count;
    }

    function nextValue() public returns(uint) {
        return ++count;
    }

    function getCounter() public view returns(uint) {
        return count;
    }
}