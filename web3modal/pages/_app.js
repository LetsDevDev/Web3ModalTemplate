import Wallet from '../components/Wallet';
import { useEffect, useState } from 'react';
import '../styles/globals.css'




function MyApp({ Component, pageProps }) {
  const [createSignature, setCreateSignature] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [connectWallet, setConnectWallet] = useState(false);
  const [disconnectWallet, setDisconnectWallet] = useState(false);


 useEffect(() => {
       console.log("isConnected", isConnected)
   }, [isConnected]);

  return(
    <>  
      {/* <TopProgressBar /> */}
   <Wallet 
   isConnected={isConnected}
   setIsConnected={setIsConnected}
   setConnectWallet={setConnectWallet}
   connectWallet={connectWallet}
   createSignature={createSignature}
   setDisconnectWallet={setDisconnectWallet}
   disconnectWallet={disconnectWallet}

   
   />
      <Component {...pageProps} isConnected={isConnected} setCreateSignature={setCreateSignature} setConnectWallet={setConnectWallet} setDisconnectWallet={setDisconnectWallet} />
      </>
  );
}

export default MyApp
