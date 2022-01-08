import React, { useState, useEffect } from "react";

import { Grommet, Button } from "grommet";
import { grommet } from "grommet/themes";
import Web3 from "web3";

function App() {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(undefined);
  const receiver = "0x62F46e2b272F0775C0872CF939800793FFe23654";

  const connectMetaMask = async () => {
    if (window.ethereum) {
      const accs = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accs);
      if (accs.length > 0) setConnected(true);
      else setConnected(false);
    } else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
    }
  };

  const transfer = async () => {
    if (web3)
      await web3.eth.sendTransaction({
        to: receiver,
        from: accounts[0],
        value: web3.utils.toWei("0.5", "ether"),
      });
  };

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }
  }, []);

  return (
    <Grommet style={{ backgroundColor: "#000" }} full theme={grommet}>
      {!connected ? (
        <Button
          primary
          label="Connect Wallet"
          onClick={() => connectMetaMask()}
        />
      ) : (
        <Button primary label="Transfer" onClick={() => transfer()} />
      )}
    </Grommet>
  );
}

export default App;
