// import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import { abi } from "../component/abi/distributor";

// const web3 = new Web3(Web3.givenProvider);

// //contract address
// const AddressOfContractInBlockchain = "Input the address of the contract from which you want to interact over here";
// const Contract = new web3.eth.Contract(abi, AddressOfContractInBlockchain);

// export const Web3Test = () => {
//   const [address, setAddress] = useState();

//   useEffect(async () => {
//     //used for getting the account details and connecting to wallet, the pop up will come because of this
//     const account = await window.ethereum.enable();
//     setAddress(account[0]);
//   }, []);

//   const callingAFunctionFromBlockchain = async () => {
//     //For function that requires funds
//     const sendFunction = await Contract.methods.'functionName'.send({from : 'the Account'})
//     //console.log(sendFunction)

//     //for simple get call
//     const callFunction = Contract.methods.'functionName'.call({from : 'the Account'})
//     //console.log(callFunction)

//     //Note : The ({from : 'the Account'}) parameter in a get call is required when suppose there is a modifier in the view function also
//   };

// console.log(address)

//   return <div></div>;
// };
