
import { providers, ethers } from 'ethers'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { providerOptions } from '../utils/providerOptions'
import Web3Modal from 'web3modal'


let web3Modal: Web3Modal;
if (typeof window !== 'undefined') {
        web3Modal = new Web3Modal({
            network: 'mainnet', // optional
            cacheProvider: true,
            providerOptions, // required
          })
  

}

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

 interface walletProps {
    setIsConnected: (isConnected: boolean) => void
    isConnected: boolean
    createSignature: string
    setConnectWallet: (connect: boolean) => void
    connectWallet: boolean
    disconnectWallet: boolean
    setDisconnectWallet: (disconnect: boolean) => void
  }

const Wallet : React.FC<walletProps> = ({
    createSignature, 
    setIsConnected, 
    isConnected,
    setConnectWallet, 
    connectWallet, 
    disconnectWallet, 
    setDisconnectWallet

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

         useEffect(() => {
         const x = async () => {
            if(createSignature.length > 0){
                await sign(createSignature)
            }
             }
            x()
            }, [createSignature])



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
  
  
  
  const sign = async(toSign:string) => {
    if(isConnected)
    {

    // configure web3, e.g. with web3Modal or in your case WalletConnect
  const web3 = await web3Modal.connect();
  
  const provider = new providers.Web3Provider(web3);
  const signer = provider.getSigner()
  const address = await signer.getAddress();

  let signedMessage;
  if (web3.wc) {
      signedMessage = await provider.send(
          'personal_sign',
          [ ethers.utils.hexlify(ethers.utils.toUtf8Bytes(toSign)), address.toLowerCase() ]
      );
  }
  else { 
      signedMessage = await signer.signMessage(toSign)
  }
  
  const verified = ethers.utils.verifyMessage(toSign, signedMessage);
  alert("signing successful from address: " + verified);
}
    }
    return(
       <>
         <p>Connected Address: {address}</p></>
    )
}

export default Wallet;

