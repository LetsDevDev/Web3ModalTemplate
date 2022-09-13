import Wallet from '../components/Wallet';
import { providers, ethers } from 'ethers'
import {  useState } from 'react';
import '../styles/globals.css'
import Web3Modal from 'web3modal'

import WalletLink from 'walletlink'
import WalletConnectProvider from '@walletconnect/web3-provider'

const InfuraId = '374b34767f8745b9bb2d7d77e97d3454';
export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: InfuraId, // required
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${InfuraId}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
  },
}


let web3Modal;
if (typeof window !== 'undefined') {
      web3Modal = new Web3Modal({
          network: 'mainnet', // optional
          cacheProvider: true,
          providerOptions, // required
        })
}



function MyApp({ Component, pageProps }) {
  const [isConnected, setIsConnected] = useState(false)
  const [connectWallet, setConnectWallet] = useState(false);
  const [disconnectWallet, setDisconnectWallet] = useState(false);
  const [address, setAddress] = useState("");

  const sign = async(toSign) => {
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

  return signedMessage;
  }

    }

  return(
    <>  
      {/* <TopProgressBar /> */}
   <Wallet 
   isConnected={isConnected}
   setIsConnected={setIsConnected}
   setConnectWallet={setConnectWallet}
   connectWallet={connectWallet}
   setDisconnectWallet={setDisconnectWallet}
   disconnectWallet={disconnectWallet}
   setAddress={setAddress}
   web3Modal={web3Modal}
   />
      <Component {...pageProps} 
      isConnected={isConnected} 
      sign={sign} 
      setConnectWallet={setConnectWallet} 
      setDisconnectWallet={setDisconnectWallet}
      address={address}
       />
      </>
  );
}

export default MyApp
