import React,{useMemo} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {connect} from "react-redux"
import {setCurrentUser} from "../redux/user/user.actions"
import 'react-toastify/dist/ReactToastify.css';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
function SignIn(props) {
  const classes = useStyles();
  const [data, setdata] = React.useState({ id_number: "", password: "" });
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
 console.log("login public",publicKey)






  const handleSubmit = async () => {

    if (!publicKey){
      console.log("connect your wallet")
    };


    if (publicKey) {
   
      const message = `Sign your auth , this message will be signed with your private key`;
  const encodedMessage = new TextEncoder().encode(message);
  const signedMessage = await window.solana.signMessage(encodedMessage, "utf8");
  var u8 = new Uint8Array(signedMessage.signature);
  var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(u8)));
var signed = new TextDecoder().decode(signedMessage.signature);
console.log(signed)
const authData={
  signature:base64String ,
  public_key:publicKey._bn
}



console.log("signedMessage",signedMessage)
      try {
        const body = authData;
        const response = await fetch(
          `http://localhost:5000/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(body)
          }
        );
  
        const parseRes = await response.json();

  
        if (parseRes.status) {
        //  localStorage.setItem("token", parseRes.jwtToken);
        props.adduser(parseRes)
          toast.success("Logged in Successfully");
          props.history.push("/my-transactions")
        } else {
      
          toast.error("Connect your wallet before sign");
        }
      } catch (err) {
        console.error(err.message);
      }
    }else{

      if(data.id_number){

        toast.error("enter password")
      }else{

        toast.error("enter id_number")
      }


    }





  };

  const handleChange = (name, val) => {
    setdata({ ...data, [name]: val });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Login
        </Typography>
        <div className={classes.form} noValidate>
      {publicKey?<WalletDisconnectButton/>:  <WalletMultiButton />}
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          Sign your Auth
          </Button>
        
                  
      
           
        </div>
      </div>
    </Container>
  );
}

const dispatchto=(dispatch)=>({
adduser:(p)=>dispatch(setCurrentUser(p))
})


export default connect(null,dispatchto)(SignIn)


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
