const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const axios = require("axios").default;
const App = express();

App.use(cors());
App.use(express.json());

App.get("/getProducts", async (req, res) => {
  console.log(req.body);

  const NexusMutualProducts = await axios.get(
    "https://api.nexusmutual.io/coverables/contracts.json"
  );
  const NsureNetworkProducts = await axios.get(
    `https://api.nsure.network/v1/cover/list`
  );

  const keyValue = (input) =>
    Object.entries(input).forEach(([key, value]) => {
      if (value.deprecated != true) {
        console.log(value.name);
      }
      // if (value.name == "BlockFi") {
      //   console.log(value,);
      // }
    });

  keyValue(NexusMutualProducts.data);

  res.json(NexusMutualProducts.data);
});

App.get('/quotes', async (req, res)=> {
  console.log(req.body)
})

App.listen(PORT, () => {
  console.log(`PORT is alive and running on ${PORT}`);
});
// 0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2
//curl -X GET -H "Origin: http://localhost:5000" 'https://api.staging.nexusmutual.io/legacy/v1/quote?coverAmount=1&currency=ETH&period=111&contractAddress=0xC57D000000000000000000000000000000000002'