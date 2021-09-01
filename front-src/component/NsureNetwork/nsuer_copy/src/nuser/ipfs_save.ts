import env from "@beam-australia/react-env";

import axios from "axios";
import NodeFormData from 'form-data';

export class IpfsServer {

    public  PINATA_API_KEY =  '0a0bcd94b36745900eac';
    public  PINATA_SECRET_API_KEY =  '2194885155b32a18d9e9c0442bddbc437a3b307dbecc5197782de21e16e3daee';
    constructor() {

    }


    /**
     * @param readable
     */
    public async pinFile(readable: any) {
        let ipfsHash: any;

        try {
            const result: any = await apinFileToIPFS(readable, this.PINATA_API_KEY, this.PINATA_SECRET_API_KEY,);
            ipfsHash = result.IpfsHash;
        } catch (e) {
            console.log(e, '<------------------------ pinJSONToIPFS');
        }

        fetch(`https://ipfs2arweave.com/permapin/${ipfsHash}`)
            .then(res => res.json())
            .then(json => console.log('Arweave success', json))
            .catch(e => console.error('Arweave error', e));

        return ipfsHash;
    }
}


function apinFileToIPFS(readStream: any, pinata_api_key: string, pinata_secret_api_key: string) {

    return new Promise((resolve, reject) => {

        const data = new NodeFormData();
        data.append('file', readStream);
        const endpoint = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        axios.post(
            endpoint,
            data,
            {
                headers: {
                    pinata_api_key,
                    pinata_secret_api_key
                }
            }).then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while pinning File to IPFS: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            //  handle error here
            if (error && error.response && error.response.data && error.response.data.error) {
                reject(new Error(error.response.data.error));
            } else {
                reject(error);
            }
        });
    });
}
