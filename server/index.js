const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const axios = require("axios").default;
const App = express();
const fetch = require("node-fetch");

App.use(cors());
App.use(express.json());

App.get("/list", async (req, res) => {
  var nexusMutualProductList = [];
  var nsureNetworkProductList = [];

  const nsureList = `https://api.nsure.network/v1/cover/list`;
  const nexusList = `https://api.nexusmutual.io/coverables/contracts.json`;

  const nsureProductList = await axios.get(nsureList);
  const nexusProductList = await axios.get(nexusList);

  const reference = Object.entries(nexusProductList.data);
  //forLoop to remove the products that are deprecated and arrange them in array order, add capacity avialable for each product, with address key & provider in it, Nexus Mutual
  for (var i = 0; i < reference.length; i++) {
    if (reference[i][1].deprecated == true) {
      continue;
    } else {
      reference[i][1].address = reference[i][0];
      reference[i][1].provider = `Nexus Mutual`;
      //nexusMutualProductList[i] = reference[i][1];

      nexusMutualProductList.push(reference[i][1]);
      //setNexusMutualProductList(nexusMutualProductList);
    }
  }

  //forLoop to unnecassary variables, arrange them in array order, with provider in it, Nsure Network
  const nsureData = nsureProductList.data.result.list;
  const nsureCount = nsureProductList.data.result.count;

  for (var n = 0; n < nsureCount; n++) {
    const dtp = {}; //dtp = dataToPush
    dtp.provider = "Nsure Network";
    dtp.name = nsureData[n].name;
    dtp.minDuration = nsureData[n].minDuration;
    dtp.maxDuration = nsureData[n].maxDuration;
    dtp.address = nsureData[n].address;
    dtp.totalSumInsured = nsureData[n].totalSumInsured;
    dtp.totalSumInsuredEth = nsureData[n].totalSumInsuredEth;
    dtp.supportedChains = ["ethereum"];
    dtp.coverAvailableAmount = nsureData[n].coverAvailableAmount;

    nsureNetworkProductList.push(dtp);
    // setNsureNetworkProductList(nsureNetworkProductList);
  }
  //console.log(nsureNetworkProductList, nexusMutualProductList);

  //console.log(nexusMutualProductList);
  res.status(200).json({
    nsureNetwork: nsureNetworkProductList,
    nexusMutual: nexusMutualProductList,
  });
});

App.post("/nexusCapacity", async (req, res) => {
  const address = req.body.address;

  const capacity = await axios(
    `https://api.staging.nexusmutual.io/v1/contracts/${address}/capacity`
  );

  res.status(200).json(capacity.data);
});

App.post("/nsureQuote", async (req, res) => {
  req.body.currency = 0;
  req.body.product = req.body.address;
  req.body.amount = `${+req.body.amount * 10 ** 18}`;
  console.log(req.body);

  const data = req.body;

  const quote = await axios.post(
    "https://api.nsure.network/v1/get_quote",
    data
  );
  console.log(quote);
  res.status(200).json({ quote: quote.data.result.list });
});

App.post("/nexusQuote", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const quote = await axios.get(
      `https://api.staging.nexusmutual.io/v1/quote?coverAmount=${data.amount}&currency=${data.currency}&period=${data.period}&contractAddress=${data.address}`
    );

    console.log(quote.data);
    res.status(200).json(quote.data);
  } catch (error) {
    console.log(error);
    res.status.send(error);
  }
});

App.post("/nsure", async (req, res) => {
  console.log(req.body.bodyParameters);
  const data = req.body.bodyParameters;
  console.log(data);

  const sign = await axios.post("https://napi.nsure.network/v1/sign", data);
  console.log(sign);
});

App.listen(PORT, () => {
  console.log(`PORT is alive and running on ${PORT}`);
});
