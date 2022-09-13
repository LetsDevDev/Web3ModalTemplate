
import { providers } from 'ethers'
import { useCallback, useEffect, useReducer } from 'react'


export interface IAssetData {
    symbol: string
    name: string
    decimals: string
    contractAddress: string
    balance?: string
  }
  
  export interface IChainData {
    name: string
    short_name: string
    chain: string
    network: string
    chain_id: number
    network_id: number
    rpc_url: string
    native_currency: IAssetData
  }
  
  export interface ITxData {
    from: string
    to: string
    nonce: string
    gasPrice: string
    gasLimit: string
    value: string
    data: string
  }
  
  export interface IBlockScoutTx {
    value: string
    txreceipt_status: string
    transactionIndex: string
    to: string
    timeStamp: string
    nonce: string
    isError: string
    input: string
    hash: string
    gasUsed: string
    gasPrice: string
    gas: string
    from: string
    cumulativeGasUsed: string
    contractAddress: string
    confirmations: string
    blockNumber: string
    blockHash: string
  }
  
  export interface IBlockScoutTokenTx {
    value: string
    transactionIndex: string
    tokenSymbol: string
    tokenName: string
    tokenDecimal: string
    to: string
    timeStamp: string
    nonce: string
    input: string
    hash: string
    gasUsed: string
    gasPrice: string
    gas: string
    from: string
    cumulativeGasUsed: string
    contractAddress: string
    confirmations: string
    blockNumber: string
    blockHash: string
  }
  
  export interface IParsedTx {
    timestamp: string
    hash: string
    from: string
    to: string
    nonce: string
    gasPrice: string
    gasUsed: string
    fee: string
    value: string
    input: string
    error: boolean
    asset: IAssetData
    operations: ITxOperation[]
  }
  
  export interface ITxOperation {
    asset: IAssetData
    value: string
    from: string
    to: string
    functionName: string
  }
  
  export interface IGasPricesResponse {
    fastWait: number
    avgWait: number
    blockNum: number
    fast: number
    fastest: number
    fastestWait: number
    safeLow: number
    safeLowWait: number
    speed: number
    block_time: number
    average: number
  }
  
  export interface IGasPrice {
    time: number
    price: number
  }
  
  export interface IGasPrices {
    timestamp: number
    slow: IGasPrice
    average: IGasPrice
    fast: IGasPrice
  }
  
  export interface IMethodArgument {
    type: string
  }
  
  export interface IMethod {
    signature: string
    name: string
    args: IMethodArgument[]
  }
  
  export interface IBoxImage {
    '@type': string
    contentUrl: {
      [label: string]: string
    }
  }
  
  export interface IBoxProfile {
    memberSince: string
    coverPhoto: IBoxImage[]
    location: string
    emoji: string
    job: string
    employer: string
    website: string
    description: string
    ethereum_proof: {
      consent_msg: string
      consent_signature: string
      linked_did: string
    }
    proof_did: string
    github: string
    image: IBoxImage[]
    name: string
  }
  

const supportedChains: IChainData[] = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Ropsten',
    short_name: 'rop',
    chain: 'ETH',
    network: 'ropsten',
    chain_id: 3,
    network_id: 3,
    rpc_url: 'https://ropsten.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Rinkeby',
    short_name: 'rin',
    chain: 'ETH',
    network: 'rinkeby',
    chain_id: 4,
    network_id: 4,
    rpc_url: 'https://rinkeby.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Görli',
    short_name: 'gor',
    chain: 'ETH',
    network: 'goerli',
    chain_id: 5,
    network_id: 5,
    rpc_url: 'https://goerli.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'RSK Mainnet',
    short_name: 'rsk',
    chain: 'RSK',
    network: 'mainnet',
    chain_id: 30,
    network_id: 30,
    rpc_url: 'https://public-node.rsk.co',
    native_currency: {
      symbol: 'RSK',
      name: 'RSK',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Kovan',
    short_name: 'kov',
    chain: 'ETH',
    network: 'kovan',
    chain_id: 42,
    network_id: 42,
    rpc_url: 'https://kovan.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Classic Mainnet',
    short_name: 'etc',
    chain: 'ETC',
    network: 'mainnet',
    chain_id: 61,
    network_id: 1,
    rpc_url: 'https://ethereumclassic.network',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'POA Network Sokol',
    short_name: 'poa',
    chain: 'POA',
    network: 'sokol',
    chain_id: 77,
    network_id: 77,
    rpc_url: 'https://sokol.poa.network',
    native_currency: {
      symbol: 'POA',
      name: 'POA',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'POA Network Core',
    short_name: 'skl',
    chain: 'POA',
    network: 'core',
    chain_id: 99,
    network_id: 99,
    rpc_url: 'https://core.poa.network',
    native_currency: {
      symbol: 'POA',
      name: 'POA',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'xDAI Chain',
    short_name: 'xdai',
    chain: 'POA',
    network: 'dai',
    chain_id: 100,
    network_id: 100,
    rpc_url: 'https://dai.poa.network',
    native_currency: {
      symbol: 'xDAI',
      name: 'xDAI',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Callisto Mainnet',
    short_name: 'clo',
    chain: 'callisto',
    network: 'mainnet',
    chain_id: 820,
    network_id: 1,
    rpc_url: 'https://clo-geth.0xinfra.com/',
    native_currency: {
      symbol: 'CLO',
      name: 'CLO',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Binance Smart Chain',
    short_name: 'bsc',
    chain: 'smartchain',
    network: 'mainnet',
    chain_id: 56,
    network_id: 56,
    rpc_url: 'https://bsc-dataseed1.defibit.io/',
    native_currency: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
]
//This is the infura API key
const InfuraId = '374b34767f8745b9bb2d7d77e97d3454';


type StateType = {
  provider?: any
  web3Provider?: any
  address?: string
  chainId?: number
}

type ActionType =
  | {
      type: 'SET_WEB3_PROVIDER'
      provider?: StateType['provider']
      web3Provider?: StateType['web3Provider']
      address?: StateType['address']
      chainId?: StateType['chainId']
    }
  | {
      type: 'SET_ADDRESS'
      address?: StateType['address']
    }
  | {
      type: 'SET_CHAIN_ID'
      chainId?: StateType['chainId']
    }
  | {
      type: 'RESET_WEB3_PROVIDER'
    }

const initialState: StateType = {
  provider: null,
  web3Provider: null,
  address: "",
  chainId: 0,
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDER':
      return initialState
    default:
      throw new Error()
  }
  
}
export function getChainData(chainId?: number): IChainData {
    if (!chainId) {
      return null as unknown as IChainData
    }
    const chainData = supportedChains.filter(
      (chain: any) => chain.chain_id === chainId
    )[0]
  
    if (!chainData) {
      throw new Error('ChainId missing or not supported, add it to providerOptions')
    }
  

  
    if (
      chainData.rpc_url.includes('infura.io') &&
      chainData.rpc_url.includes('%API_KEY%') &&
      InfuraId
    ) {
      const rpcUrl = chainData.rpc_url.replace('%API_KEY%', InfuraId)
  
      return {
        ...chainData,
        rpc_url: rpcUrl,
      }
    }
  
    return chainData
  }
 interface walletProps {
    setIsConnected: (isConnected: boolean) => void
    isConnected: boolean
    setConnectWallet: (connect: boolean) => void
    connectWallet: boolean
    disconnectWallet: boolean
    setDisconnectWallet: (disconnect: boolean) => void
    setAddress: (address: string) => void
    web3Modal: any
  }

const Wallet : React.FC<walletProps> = ({
    setIsConnected, 
    isConnected,
    setConnectWallet, 
    connectWallet, 
    disconnectWallet, 
    setDisconnectWallet,
    setAddress,
    web3Modal

}: walletProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { provider, web3Provider, address, chainId } = state
 
    const connect = useCallback(async function () {
      // This is the initial `provider` that is returned when
      // using web3Modal to connect. Can be MetaMask or WalletConnect.
      const provider = await web3Modal.connect()
  
      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      const web3Provider = new providers.Web3Provider(provider)
  
      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()
      setAddress(address.toLowerCase());
      const network = await web3Provider.getNetwork()
  
      dispatch({
        type: 'SET_WEB3_PROVIDER',
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      })
      setIsConnected(true);
    }, [])
  
    const disconnect = useCallback(
      async function () {
        await web3Modal.clearCachedProvider()
        if (provider?.disconnect && typeof provider.disconnect === 'function') {
          await provider.disconnect()
        }
        dispatch({
          type: 'RESET_WEB3_PROVIDER',
        })
        setIsConnected(false);
        setAddress("");
      },
      [provider]
    )
    
    useEffect(() => {
    if(connectWallet)
    {
        connect();
        setConnectWallet(false);
    }

}, [connectWallet])

 
useEffect(() => {
    if(disconnectWallet)
    {
        disconnect();
        setDisconnectWallet(false);
    }

}, [disconnectWallet])

      


    // Auto connect to the cached provider
    useEffect(() => {
      if (web3Modal.cachedProvider) {
        connect()
      }
    }, [connect])
  
    // A `provider` should come with EIP-1193 events. We'll listen for those events
    // here so that when a user switches accounts or networks, we can update the
    // local React state with that new information.
    useEffect(() => {
      if (provider?.on) {
        const handleAccountsChanged = (accounts: string[]) => {
          // eslint-disable-next-line no-console
          console.log('accountsChanged', accounts)
          dispatch({
            type: 'SET_ADDRESS',
            address: accounts[0],
          })
        }
  
        // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
        const handleChainChanged = (_hexChainId: string) => {
          console.log(_hexChainId)
   
        }
  
        const handleDisconnect = (error: { code: number; message: string }) => {
          // eslint-disable-next-line no-console
          console.log('disconnect', error)
          disconnect()
        }
  
        provider.on('accountsChanged', handleAccountsChanged)
        provider.on('chainChanged', handleChainChanged)
        provider.on('disconnect', handleDisconnect)
        provider.on("modal_close", (error: { code: number; message: string }) => {
            console.log(error);
          });
  
        // Subscription Cleanup
        return () => {
          if (provider.removeListener) {
            provider.removeListener('accountsChanged', handleAccountsChanged)
            provider.removeListener('chainChanged', handleChainChanged)
            provider.removeListener('disconnect', handleDisconnect)
          }
        }
      }
    }, [provider, disconnect])
  
  
  

    return(
       <>
         <p>Connected Address: {address}</p></>
    )
}

export default Wallet;

