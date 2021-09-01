import env from "@beam-australia/react-env";
import React from "react";


export const AppConfig:any = {
    chainId:parseInt(env("CHAIN_Id")),
    urlPath:env('IMG_PATH'),
    comingSoon:env('Coming_Soon'),
    IPFS_NONE:env('IPFS_NONE'),
    rpcUrl:{
        1:'https://mainnet.infura.io/v3/a17d484065334e38bd8b6475ca266c88',
        42:'https://kovan.infura.io/v3/a17d484065334e38bd8b6475ca266c88'
    },
    etherscan:{
        1:'https://etherscan.io/',
        42:'https://kovan.etherscan.io/'
    }
}


