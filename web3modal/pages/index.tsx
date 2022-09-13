



interface homeProps {
  isConnected: boolean
  setCreateSignature:(message:string) => void
  setConnectWallet: (connect: boolean) => void
  setDisconnectWallet: (disconnect: boolean) => void
}

const styles = {
  container: {
    fontWeight: "bold",
    height:"10em",
    width:"10em",
    margin:"5em",
  },
};
export const Home : React.FC<homeProps> = ({setConnectWallet, isConnected, setCreateSignature, setDisconnectWallet}: homeProps) => {

  return (
    <div >

{isConnected ?
<>
  <button
  style={styles.container}
onClick={()=> setDisconnectWallet(true)}>Disconnect wallet</button>
<button
style={styles.container}
onClick={()=> setCreateSignature(Math.random().toString())}>Create signature</button>
</>
:
<button
style={styles.container}
onClick={()=> setConnectWallet(true)}>Connect wallet</button>
}

    </div>
  )
}


export default Home;