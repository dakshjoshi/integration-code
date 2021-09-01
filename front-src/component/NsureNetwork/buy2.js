// import React from 'react'
// import React, { useEffect, useState } from "react";
// import Web3 from "web3";
// import { NsureNetwork } from "../../abi/nsureNetwork";
// import "bootstrap/dist/css/bootstrap.min.css";

// const web3 = new Web3(Web3.givenProvider);
// const contractAddr = "0x702aff99b08e8891fc70811174701fb7407b4477";
// const SimpleContract = new web3.eth.Contract(NsureNetwork, contractAddr);

// export const buy2 = () => {

//     const personal_sign = () => {
//         event.preventDefault()
//         var text = terms
//         var msg = ethUtil.bufferToHex(new Buffer(text, 'utf8'))
//         // var msg = '0x1' // hexEncode(text)
//         console.log(msg)
//         var from = web3.eth.accounts[0]
//         if (!from) return connect()

//         /*  web3.personal.sign not yet implemented!!!
//          *  We're going to have to assemble the tx manually!
//          *  This is what it would probably look like, though:
//           web3.personal.sign(msg, from) function (err, result) {
//             if (err) return console.error(err)
//             console.log('PERSONAL SIGNED:' + result)
//           })
//         */

//          console.log('CLICKED, SENDING PERSONAL SIGN REQ')
//         var params = [msg, from]
//         var method = 'personal_sign'

//         web3.currentProvider.sendAsync({
//           method,
//           params,
//           from,
//         }, function (err, result) {
//           if (err) return console.error(err)
//           if (result.error) return console.error(result.error)
//           console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))

//           console.log('recovering...')
//           const msgParams = { data: msg }
//           msgParams.sig = result.result
//           console.dir({ msgParams })
//           const recovered = sigUtil.recoverPersonalSignature(msgParams)
//           console.dir({ recovered })

//           if (recovered === from ) {
//             console.log('SigUtil Successfully verified signer as ' + from)
//             window.alert('SigUtil Successfully verified signer as ' + from)
//           } else {
//             console.dir(recovered)
//             console.log('SigUtil Failed to verify signer when comparing ' + recovered.result + ' to ' + from)
//             console.log('Failed, comparing %s to %s', recovered, from)
//           }
//         }
//     }

//     return (
//         <div>

//         </div>
//     )
// }
