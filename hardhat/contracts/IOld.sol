// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.0;

interface IOld {
	function getNodeTypeOwnerCreatedPending(string memory, address) external returns(uint);
	function getNodeTypeLevelUp(string memory, address) external returns(uint);
	function getNodeTypeOwnerNumber(string memory, address) external returns(uint);
}
