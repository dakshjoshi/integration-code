import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { NsureNetwork } from "../abi/nsureNetwork";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const web3 = new Web3(Web3.givenProvider);
//Koavn
const contractAddr = "0x92621a98074747e3648d11627ae3b182a010e574";
//Main net
//const contractAddr = "0x702aff99b08e8891fc70811174701fb7407b4477";
const SimpleContract = new web3.eth.Contract(NsureNetwork, contractAddr);

export const BuyNsureNetwork = () => {
  const [address, setAddress] = useState("");

  useEffect(async () => {
    const account = await window.ethereum.enable();
    setAddress(account[0]);

    console.log(SimpleContract);
    console.log(address);
  }, []);

  const [payableAmount, setPayableAmount] = useState(2000000000000000000);
  const [_productId, setProductId] = useState(1);
  const [_amount, setAmount] = useState(2000000000000000000);
  const [_cost, setCost] = useState(2000000000000000000);
  const [period, setPeriod] = useState(30);
  const [signature, setSignature] = useState();
  const [bodyParameters, setBodyParameters] = useState({
    inviter: "",
    params: "",
    sign: "",
    user: "",
  });
  const [deadline, setDeadline] = useState(1607680924304);
  const [currency, setCurrency] = useState(0);
  const [go, setGo] = useState(false);

/*  const someDATA = JSON.stringify({
    message: {
      account: address,
      currencyType: currency,
      amount: _amount,
      cost: _cost,
      period: period,
      product: _productId,
      nonce: 3,
      deadline: deadline,
    },
  });*/
  const someDATA = JSON.stringify(biggerDATA);

  const signTheMsg = async () => {
    web3.currentProvider.sendAsync(
      {
        method: "personal_sign",
        params: [someDATA, address],
        from: address,
      },
      function (err, result) {
        if (err) {
          return console.error(err);
        }
        console.log("Result : ");
        console.log(result);
        console.log("Rest of it : ");
        const sign = result.result;
        console.log(sign);
        setSignature(sign);
        buyIt();
      }
    );
    //web3.eth.personal.sign([someDATA, address], password [, callback])
  };

  const verifySign = () => {
    console.log("Verfiy");
    const verify = web3.eth.personal
      .ecRecover(someDATA, signature)
      .then(console.log);
  };

  const details = {
    product: 5,
    amount: 2000000000000000000,
    period: 30,
    currency: 0,
  };

  console.log(signature);

  const buyIt = async () => {
    bodyParameters.inviter = address;
    bodyParameters.params = JSON.stringify(biggerDATA);
    bodyParameters.sign = {
      result: signature,
    };
    //user is the person who buys the product
    bodyParameters.user = address;

    setBodyParameters(bodyParameters);
    console.log(bodyParameters);

    const signAPI = await axios.post("http://localhost:5000/nsure", {
      bodyParameters,
    });

    //"https://napi.nsure.network/v1/sign",

    // const quote = await axios.post("https://api.nsure.network/v1/get_quote", {
    //   details,
    // });

    //console.log(quote);
    console.log(signAPI);

    // //Buying the product
    const buyProduct = await SimpleContract.methods.buyInsurance(
      _productId,
      _amount,
      _cost,
      period,
      v,
      r,
      s,
      deadline,
      currency
    ).send({ from :account, value : amount});

    // console.log(buyProduct);
  };

  return (
    <>
      <button onClick={signTheMsg}> Sign </button>
      <button onClick={verifySign}> Verify the sign </button>
    </>
  );
};

const message = {
  account: "0x48D88a5D10595338E46C82256858BaCbcD38e224", // user addr
  currencyType: 0, // Payment asset type
  amount: "2000000000000000000", // Insured ETH amount (unit: wei)
  period: 30, // Insurance period (unit: day, 30~365)
  product: 4, //Insurance product id
  nonce: "3", // nonce
  deadline: Date.now(),
};

const biggerDATA = {
  domain: {
    name: "sign",
    chainId: 42,
  },
  message: message,
  primaryType: "sign",
  types: {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "chainId", type: "uint256" },
    ],
    sign: [
      {
        name: "product",
        type: "uint256",
      },
      {
        name: "account",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
      {
        name: "currencyType",
        type: "uint256",
      },
      {
        name: "period",
        type: "uint256",
      },
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
  },
};

//`{"domain":{"name":"sign","chainId":42},"message":{"account":${message.account},"currencyType":${message.currency},"amount":${message.amount},"period":${message.period},"product":${message.product},"nonce":${message.nonce},"deadline":${message.deadline}},"primaryType":"sign","types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"chainId","type":"uint256"}],"sign":[{"name":"product","type":"uint256"},{"name":"account","type":"address"},{"name":"amount","type":"uint256"},{"name":"currencyType","type":"uint256"},{"name":"period","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"deadline","type":"uint256"}]}}`;
//  '{"domain":{"name":"sign","chainId":42},"message":{"account":"0x48D88a5D10595338E46C82256858BaCbcD38e224","currencyType":0,"amount":"2000000000000000000","period":30,"product":4,"nonce":"3","deadline":1607680924304},"primaryType":"sign","types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"chainId","type":"uint256"}],"sign":[{"name":"product","type":"uint256"},{"name":"account","type":"address"},{"name":"amount","type":"uint256"},{"name":"currencyType","type":"uint256"},{"name":"period","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"deadline","type":"uint256"}]}}';
