import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Web3 from "web3";
import { distributor } from "../abi/Nexus-contracts/distributor";
import { NXMMaster } from "../abi/Nexus-contracts/NXMMaster";
import { NXMToken } from "../abi/Nexus-contracts/NXMToken";
import { tokenController } from "../abi/Nexus-contracts/TokenController";

import "bootstrap/dist/css/bootstrap.min.css";
const { ether } = require("@openzeppelin/test-helpers");

const web3 = new Web3(Web3.givenProvider);

const BN = web3.utils.BN;

const NexusDistributorAddress = "0xE9a4f29CF2cD085C6492c7761900335EBceF600f";
const NexusContract = new web3.eth.Contract(
  distributor,
  NexusDistributorAddress
);

const NexusTokenController = "0x7fe7bca5a543eee776eb287b5a13e71905312e4c";
const NexusNXMaster = "0x2561d7f2436c121281388ecd54c702e55aa24043";
const NexusNXMToken = "0xf2e86ac0c17a7a1431b95cfead37e15631cc5ee7";

const NexusTCContract = new web3.eth.Contract(
  tokenController,
  NexusTokenController
);
const NexusNXMasterContract = new web3.eth.Contract(NXMMaster, NexusNXMaster);
const NexusNXMTokenContract = new web3.eth.Contract(NXMToken, NexusNXMToken);

export const List = () => {
  console.log(web3);
  const [nexusMutualProductList, setNexusMutualProductList] = useState([]);
  const [nsureNetworkProductList, setNsureNetworkProductList] = useState([]);
  const [go, setGo] = useState(false);
  const [account, setAddress] = useState();

  //NexusVariables
  const [nexusR, setnexusR] = useState();
  const [nexusS, setnexusS] = useState();
  const [nexusV, setnexusV] = useState();
  const [nexusPrice, setnexusPrice] = useState();
  const [nexusPriceInNXM, setnexusPriceInNXM] = useState();
  const [nexusExpiresAt, setnexusExpiresAt] = useState();
  const [nexusGeneratedAt, setnexusGeneratedAt] = useState();
  const [nexusAmount, setnexusAmount] = useState();
  const [nexusPeriod, setnexusPeriod] = useState();
  const [nexusAddress, setnexusAddress] = useState();

  //Nsure Variables

  console.log(`Address : ${NexusTCContract._address}`);
  console.log(NexusTCContract);

  useEffect(async () => {
    //Setting address
    const address = await window.ethereum.enable();
    setAddress(address[0]);
  }, []);

  console.log(web3);
  console.log(account);
  console.log(NexusContract);

  //For form
  const { handleSubmit, register } = useForm();

  const NexusBuy = async (
    r,
    s,
    v,
    quotePrice,
    priceInNXM,
    expiresAt,
    generatedAt,
    amountInEth,
    period,
    productAddress
  ) => {
    // const approval = await distributor.approveNXM(
    //   tokenController.address,
    //   ether("100000")
    // );
    // console.log(approval);

    //Finding fee percentage
    const feePercentage = await NexusContract.methods
      .feePercentage()
      .call({ from: account });

    const price = new BN(quotePrice);

    //Approving NXM
    // //Getting address for NXMMaster
    // const mast = await NexusContract.methods.master().call({ from: account });
    // console.log(mast);

    // const tc = await NexusNXMasterContract.methods
    //   .getLatestAddress(hex("TC"))
    //   .call({ from: account });

    // console.log(tc);
    // console.log(`Hex : ${hex(`TC`)}`);

    const approval = await NexusContract.methods
      .approveNXM("0x7fe7bca5a543eee776eb287b5a13e71905312e4c", ether("100000"))
      .send({ from: account });

    console.log(approval);

    console.log(feePercentage);
    const encodedParameters = web3.eth.abi.encodeParameters(
      ["uint", "uint", "uint", "uint", "uint8", "bytes32", "bytes32"],
      [price, priceInNXM, expiresAt, generatedAt, v, r, s]
    );
    // console.log(encodedParameters);

    const amountWithFee = `${((100 + feePercentage / 100) * price) / 100}`;

    const amountBig = `${amountInEth * 10 ** 18}`;
    //const amountInWei = new BN(amountBig);

    console.log(NexusContract);
    console.log(
      productAddress,
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      amountBig,
      period,
      0,
      amountWithFee,
      encodedParameters
    );

    const buyingInsurance = await NexusContract.methods
      .buyCover(
        productAddress,
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        amountBig,
        period,
        0,
        amountWithFee,
        encodedParameters
      )
      .send({ from: account, value: amountWithFee });

    console.log(buyingInsurance);
  };

  const NsureBuy = async () => {};

  //Will get the quote details of each product
  const getQuote = async (data) => {
    console.log(data);
    // setAmount(data.amount);
    // setPeriod(data.period);
    // setAddressOfproduct(data.address);
    //data.currency = currency;

    if (data.provider == "NexusMutual") {
      const quote = await axios.post("http://localhost:5000/nexusQuote", data);
      console.log(quote);
      const q = quote.data;

      alert(`Price : ${q.price}, Price in NXM : ${q.priceInNXM}`);

      //Buying the product

      setnexusR(q.r);
      setnexusS(q.s);
      setnexusV(q.v);
      setnexusPrice(q.price);
      setnexusPriceInNXM(q.priceInNXM);
      setnexusExpiresAt(q.expiresAt);
      setnexusGeneratedAt(q.generatedAt);
      setnexusAmount(data.amount);
      setnexusPeriod(data.period);
      setnexusAddress(data.addres);
    } else if (data.provider == "NsureNetwork") {
      const quote = await axios.post("http://localhost:5000/nsureQuote", data);
      console.log(quote);
    }
  };

  const nexusCapacity = async (address) => {
    const capacity = await axios.post("http://localhost:5000/nexusCapacity", {
      address: address,
    });
    const d = capacity.data;
    console.log(d);
    alert(
      `ETH CAPACITY : ${d.capacityETH}, DAI CAPACITY : ${d.capacityDAI}, NXM STAKED : ${d.netStakedNXM}`
    );
  };

  const workWithServer = async () => {
    const result = await axios.get("http://localhost:5000/list");
    console.log(result);
    setNexusMutualProductList(result.data.nexusMutual);
    setNsureNetworkProductList(result.data.nsureNetwork);
    setGo(1);
  };

  return (
    <div>
      {go && (
        <div className="card-group">
          {nexusMutualProductList.map((product, idx) => {
            return (
              <div key={idx} className="flex" id="cardIndividual">
                <div className="card-body bg-light">
                  <h5 className="card-title">{product.name}</h5>
                </div>
                <p className="card-text">{product.provider}</p>
                <button
                  className="btn btn-light border rounded-0"
                  onClick={() => nexusCapacity(product.address)}
                >
                  Additional Details
                </button>
                <br />
                <button
                  className="btn btn-light border rounded-0"
                  onClick={() => console.log(product.address)}
                >
                  Get Quote
                </button>
              </div>
            );
          })}
        </div>
      )}
      {go && (
        <div className="card-group">
          {nsureNetworkProductList.map((product, idx) => {
            return (
              <div key={idx} className="flex" id="cardIndividual">
                <div className="card-body bg-light">
                  <h5 className="card-title">{product.name}</h5>
                </div>
                <p className="card-text">{product.provider}</p>

                <button
                  className="btn btn-light border rounded-0"
                  onClick={() => {
                    alert(
                      `Avialable Cover Amount : ${product.coverAvailableAmount}`
                    );
                  }}
                >
                  Additional Details
                </button>
                <br />
                <button
                  className="btn btn-light border rounded-0"
                  onClick={() => console.log(idx)}
                >
                  Get Quote
                </button>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={workWithServer}>Server</button>
      <form onSubmit={handleSubmit(getQuote)}>
        <input placeholder="Amount" {...register("amount")} />
        <input placeholder="Period" {...register("period")} />
        <input placeholder="Address" {...register("address")} />
        <select {...register("currency")}>
          <option value="ETH">Ethereum</option>;
          <option value="BSC">Bitcoin</option>;
        </select>
        <select {...register("provider")}>
          <option value="NexusMutual">Nexus Mutual</option>;
          <option value="NsureNetwork">Nsure Network</option>;
        </select>
        <input type="submit" className="btn btn-light rounded-0" />
      </form>
      <button
        onClick={() =>
          NexusBuy(
            nexusR,
            nexusS,
            nexusV,
            nexusPrice,
            nexusPriceInNXM,
            nexusExpiresAt,
            nexusGeneratedAt,
            nexusAmount,
            nexusPeriod,
            nexusAddress
          )
        }
      >
        Nexus Buy
      </button>
      <button onClick={() => NsureBuy()}>Nsure Buy</button>
    </div>
  );
};
