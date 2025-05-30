// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract Media {
    struct MediaUnit {
        uint id;
        address creator;
        string cid;
        string name;
        uint timestamp;
        bool isDeleted;
    }

    MediaUnit[] arts;
    uint nextId = 0;

    function newArt(string memory cid, string memory name) external {
        arts.push(MediaUnit(nextId++, msg.sender, cid, name, block.timestamp, false));
    }

    function deleteArt(uint id) external {
        for (uint i = 0; i < arts.length; i++) {
            if (arts[i].id == id) {
                arts[i].isDeleted = true;
                break;
            }
        }
    }

    function getArts() external view returns(MediaUnit[] memory) {
        MediaUnit[] memory notDeletedArts = new MediaUnit[](arts.length);
        uint trueLen = 0;
        for (uint i = 0; i < arts.length; i++) {
            if (!arts[i].isDeleted) {
                notDeletedArts[trueLen++] = arts[i];
            }
        }
        assembly {
            mstore(notDeletedArts, trueLen)
        }
        return arts;
    }
}