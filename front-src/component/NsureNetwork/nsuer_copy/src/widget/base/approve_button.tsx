import React from "react";
import {ButtonWidget} from "./button";
import {useModel} from "../../hook/use_model";
import {SendModal} from "../modal/send_modal";
import {useAllowance, useApprove} from "../../server/token_server";
import {Contract} from "web3-eth-contract";


export const ApproveButton: React.FC<{ contract: Contract, contractAddress: string, spender: string }> = ({
                                                                                                              contract,
                                                                                                              contractAddress,
                                                                                                              spender
                                                                                                          }) => {

    const [approve] = useApprove(contract, contractAddress, spender); // 授权方法

    const [handleApprove] = useModel(<SendModal confirmationFn={approve}/>); // 申请授权

    return (
        <div>
            <ButtonWidget text={"Approve"} onClick={handleApprove} type={"img"}/>
        </div>
    );
}


export const IsApprove: React.FC<{
    erc20: Contract | undefined,
    spender: string | undefined,
    erc20Address: string | undefined,
}> = ({
          erc20,
          spender,
          erc20Address,
          children
      }) => {


    const allowance = useAllowance(erc20, spender || '');



    return (
        <div>
            {
                erc20Address && erc20 && spender  ?
                    allowance <= 0 ? <ApproveButton contract={erc20}
                                                    contractAddress={erc20Address}
                                                    spender={spender}/>
                        : children :
                    children
            }
        </div>
    );
}
