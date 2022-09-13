



interface homeProps {
  isConnected: boolean
  sign:(message:string) => string
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
export const Home : React.FC<homeProps> = ({setConnectWallet, 
  isConnected, sign, setDisconnectWallet}: homeProps) => {


const handleSign = async () => {
  var signature = await sign("Message to sign:  RandomNumber = " + Math.random().toString());
  alert("Signature: " + signature);
}
  return (
    <div >
{isConnected ?
<>
  <button
  style={styles.container}
onClick={()=> setDisconnectWallet(true)}>Disconnect wallet</button>
<button
style={styles.container}
onClick={()=> handleSign()}>Create signature</button>
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