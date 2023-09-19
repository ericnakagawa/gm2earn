//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import "@celo/contracts/common/UsingRegistryV2.sol"

contract Gmer {
    // user must pay a minum of 0.1 CELO to join the GM game
    // only one GM game happens at one time
    // random winner is determined each time
    
    event newestShaker(address gmer);

    address[] arrGmers; // array of gmers in the competition
    uint256 timeEndGame;
    address arrLastWinner;
    uint256 gamePool;

    // this sets up a collection of gm2earn players
    constructor() payable {
        // set the end of the game to be 5 hours into the future
        timeEndGame = block.timestamp + uint256(60 * 60 * 5);
        gamePool = 0.13 ether;
        
        arrGmers =  [0xA8dDa8d7F5310E4A9E24F8eBA77E091Ac264f872,
        0xA8dDa8d7F5310E4A9E24F8eBA77E091Ac264f872,
        0xA8dDa8d7F5310E4A9E24F8eBA77E091Ac264f872,
        0xA8dDa8d7F5310E4A9E24F8eBA77E091Ac264f872,
        0xA8dDa8d7F5310E4A9E24F8eBA77E091Ac264f872,
        0x7457d5E02197480Db681D3fdF256c7acA21bDc12,
        0x7457d5E02197480Db681D3fdF256c7acA21bDc12,
        0x7457d5E02197480Db681D3fdF256c7acA21bDc12,
        0x7457d5E02197480Db681D3fdF256c7acA21bDc12,
        0x7457d5E02197480Db681D3fdF256c7acA21bDc12,
        0x91c987bf62D25945dB517BDAa840A6c661374402,
        0x91c987bf62D25945dB517BDAa840A6c661374402,
        0x91c987bf62D25945dB517BDAa840A6c661374402];
    }

    function getGmers() external view returns (address[] memory) {
        return arrGmers;
    }

    function getGameInfo() external view returns (uint256, uint256, address[] memory){
        return (timeEndGame, gamePool, arrGmers);
    }

    function getTimeEndGame() external view returns (uint256) {
        return timeEndGame;
    }

    function calculateWinner() public view returns (uint) {
        // require(timeEndGame < block.timestamp, "Game hasn't completed yet.");

        // exercise for the hacker to randomly select a winner

        // bonus points for using a provably random function like Chainlink's VRF

        return arrGmers.length;
    }

    function addGmer() payable external returns (uint) {
        // require((msg.value >= 1e16, "You need to send at least 0.01 CELO to join"); // 0.01 ether (celo)
        
        arrGmers.push(msg.sender);

        gamePool = gamePool + ((msg.value / 20) * 19); // cannot use fractions

        return arrGmers.length;
    }

}
