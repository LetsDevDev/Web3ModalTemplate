

import Wallet from '../components/Wallet'
import { useEffect, useState } from 'react'


interface homeProps {
  isConnected: boolean
  setCreateSignature:(message:string) => void
}
export const Home : React.FC<homeProps> = ({isConnected, setCreateSignature}: homeProps) => {

console.log(isConnected)

  return (
    <div >
      
<h1>Hello</h1>
<button
onClick={()=> setCreateSignature(Math.random().toString())}>Create signature</button>



    </div>
  )
}


export default Home;