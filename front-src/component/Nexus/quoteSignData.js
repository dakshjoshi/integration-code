import React from "react";
import axios from "axios";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

export const NexusSign = () => {
  const coverData = {
    coverAmount: "1", // ETH in units not wei
    currency: "ETH",
    asset: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // stands for ETH
    period: "111", // days
    contractAddress: "0xC57D000000000000000000000000000000000002", // the contract you will be buying cover for
  };

  const nexusFunction = async () => {
    const quoteURL =
      `https://api.staging.nexusmutual.io/v1/quote?` +
      `coverAmount=${coverData.coverAmount}&currency=${coverData.currency}&period=${coverData.period}&contractAddress=${coverData.contractAddress}`;

    console.log(quoteURL);

    const quote = await axios.get(quoteURL).then((r) => r.json());
    console.log(quote);

    // encode the signature result in the data field
    const data = web3.eth.abi.encodeParameters(
      ["uint", "uint", "uint", "uint", "uint8", "bytes32", "bytes32"],
      [
        quote.price,
        quote.priceInNXM,
        quote.expiresAt,
        quote.generatedAt,
        quote.v,
        quote.r,
        quote.s,
      ]
    );
  };

  return <div></div>;
};
