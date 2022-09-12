import Wallet from '../components/Wallet';
import { useEffect, useState } from 'react';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  const [createSignature, setCreateSignature] = useState("")
  const [isConnected, setIsConnected] = useState(false)
 
 useEffect(() => {
       console.log("isConnected", isConnected)
   }, [isConnected]);
 
  return(
    <>  
      {/* <TopProgressBar /> */}
   <Wallet setIsConnected={setIsConnected} createSignature={createSignature}/>
      <Component {...pageProps} isConnected={isConnected} setCreateSignature={setCreateSignature} />
      </>
  );
}

export default MyApp
