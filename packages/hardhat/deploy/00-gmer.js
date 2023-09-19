// deploy/00_deploy_my_contract.js

const { ethers } = require("hardhat");
const hre = require("hardhat");

const sleep = (ms) =>
  new Promise((r) =>
    setTimeout(() => {
      console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
      r();
    }, ms)
  );

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;

    // Named Accounts are for improving developer experience, can be configured in hardhat.config.js
    const { deployer } = await getNamedAccounts();

    const myContract = await deploy("Gmer", {
        from: deployer,
        args: [],
        log: true,
        value: ethers.utils.parseEther("0.05"),
    });

    await sleep(2500);

    // auto verify these contracts
    await hre.run("verify:verify", {
        address: myContract.address,
        contract: "contracts/Gmer.sol:Gmer", //Filename.sol:ClassName
        constructorArguments: [],
     });
     
     // add some CELO
    // const deployerWallet = ethers.provider.getSigner()
    // await deployerWallet.sendTransaction({
    //   to: myContract.address,
    //   gasLimit: 10000000,
    //   value: ethers.utils.parseEther("0.01")
    // })

// console.log(deployments);
//     Gmer.deployTransaction.wait(5)
//     Gmer.run("verify:verify", {
//      address: myContract.address,
//      contract: "contracts/Gmer.sol:Gmer", //Filename.sol:ClassName
//    constructorArguments: [],


    // const Gmer = new ethers.Contract("Gmer", deployer);

    // const deployerWallet = ethers.provider.getSigner()
    // await deployerWallet.sendTransaction({
    //   to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    //   value: ethers.utils.parseEther("0.01")
    // })
    // const yourContract = await deploy("Gmer",{
    // from: deployer,    
    // args: []
    //         value: ethers.utils.parseEther("0.05")
    //     },
    //     log: true});
  
    // console.log(deployments);
//     Gmer.deployTransaction.wait(5)
//     Gmer.run("verify:verify", {
//      address: myContract.address,
//      contract: "contracts/Gmer.sol:Gmer", //Filename.sol:ClassName
//    constructorArguments: [],


    // Getting a previously deployed contract
    // const Greeter = new ethers.Contract("Greeter", deployer);

    // await Greeter.setGreeting("Hello Celo!");

    /*
  // If you want to send value to an address from the deployer
  
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

    /*
  //If you want to send some CELO to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("Gmer", [], {
    value: ethers.utils.parseEther("0.05")
  });
  */
//   const yourContract = await deploy("Gmer", [], {
//     value: ethers.utils.parseEther("0.01")
//   });

    /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
    LibraryName: **LibraryAddress**
  });
  */
};

/**
 * Use tags to run specific deploy scripts
 * For example:- npx hardhat deploy --tags Greeter will run only this script
 */
module.exports.tags = ["Gmer"];
