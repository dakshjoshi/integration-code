import {Connector} from '../types'
import {ConnectorConfigError} from '../errors'

export default async function init(): Promise<Connector> {
    const {LedgerConnector} = await import('@web3-react/ledger-connector')
    return {
        web3ReactConnector({
                               chainId,
                               url,
                           }: {
            chainId: number
            url: string
        }) {
            if (!chainId) {
                throw new ConnectorConfigError(
                    'The Ledger connector requires apiKey to be set.'
                )
            }
            if (!url) {
                throw new ConnectorConfigError(
                    'The Ledger connector requires apiKey to be set.'
                )
            }
            console.log(url,chainId)
            return new LedgerConnector({url, chainId})
        },
    }
}
