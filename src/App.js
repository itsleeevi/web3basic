import React, { useState, useEffect } from "react";

import { Grommet, Button, Box, Grid, Heading } from "grommet";
import { grommet } from "grommet/themes";
import Web3 from "web3";
import { ChakraProvider } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

function App() {
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(undefined);
  const receiver = "0x62F46e2b272F0775C0872CF939800793FFe23654";
  const [amount, setAmount] = useState("1");
  const parse = (val) => val.replace(/^\$/, "");
  const [value, setValue] = useState(1);

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
        value: web3.utils.toWei(value, "ether"),
      });
  };

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }
  }, []);

  useEffect(() => {
    setValue(Number(amount) * 10);
  }, [amount]);

  return (
    <Grommet full theme={grommet}>
      <ChakraProvider>
        <Grid
          fill={true}
          pad="medium"
          rows={["full"]}
          columns={["auto", "flex", "auto"]}
          gap="small"
          areas={[
            { name: "left", start: [0, 0], end: [0, 0] },
            { name: "center", start: [1, 0], end: [1, 0] },
            { name: "right", start: [2, 0], end: [2, 0] },
          ]}
        >
          <Box gridArea="left" />
          <Box
            direction="column"
            align="center"
            justify="center"
            alignSelf="center"
            gridArea="center"
            gap="medium"
          >
            {!connected ? (
              <Button
                primary
                label="Connect Wallet"
                onClick={() => connectMetaMask()}
              />
            ) : (
              <Box
                direction="column"
                width="medium"
                justify="center"
                gap="small"
              >
                <NumberInput
                  defaultValue={1}
                  min={1}
                  onChange={(valueString) => setAmount(parse(valueString))}
                  value={amount}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Box
                  border={{ color: "black", size: "large" }}
                  pad="medium"
                  align="center"
                >
                  <Heading>{value}</Heading>
                </Box>
                <Button primary label="Transfer" onClick={() => transfer()} />
              </Box>
            )}
          </Box>
          <Box gridArea="right" />
        </Grid>
      </ChakraProvider>
    </Grommet>
  );
}

export default App;
