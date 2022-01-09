import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  SystemProgram,
  Transaction,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";
import React, { FC, useCallback, useState } from "react";
import { Button } from "@material-ui/core";
const SendOneLamportToRandomAddress = ({
  transaction_id,
  reload,
  amount,
  user_id,
}) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [saved_signature, setSignature] = useState("");

  const onClick = useCallback(async () => {
    let my_connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    try {
      if (!publicKey) throw new WalletNotConnectedError();

      setLoading(true);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: "2Y9aCXH8od6w9sTZ2MnhrnwDAsS45cnbfJLwnMTg6wiX",
          lamports: amount,
        })
      );
try {
  const signature = await sendTransaction(transaction, connection);
  console.log("orginal", signature);
  setSignature(signature);

  await connection.confirmTransaction(signature, "processed");

 

} catch (error) {
  
}
const body = {
  transaction_id,

  amount,
  user_id,
};
      const response = await fetch(`http://localhost:5000/user/pay_tax`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      reload();
    }
  }, [publicKey, sendTransaction, connection]);

  if (loading)
    return (
      <a
        style={{ color: "green" }}
        href={`https://explorer.solana.com/tx/${saved_signature}`}
      >
        Check confirmation
      </a>
    );
  else
    return (
      <Button
        onClick={onClick}
       
        variant="contained"
        color="secondary"
      >
        {loading ? "Waiting confirmation" : "pay"}
      </Button>
    );
};

export default SendOneLamportToRandomAddress;
