import React from 'react'
import Searcbar from "../components/searchinput"
import Lottie from "react-lottie";
import animationData from "./lottie.json";
import { Button, Grid } from '@material-ui/core';
import {Link} from "react-router-dom"
import "./home.scss"


const Home=(props)=> {

  const defaultOptions = {
    loop: true,
  
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


    return (
        <div >
   <Grid container justify="center" direction='column' alignItems='center'  style={{width:"100%",textAlign:"center",paddingTop:50}}>
    <Grid item alignItems='flex-start' justify="flex-start">
  
      
    
        <h1 class="title">
          <span class="func">Modern </span>
          <span>Tax System</span>
        </h1>
        <p class="-gray" style={{width:"100%",textAlign:"end"}}>
          powered by <span class="func">Web 3 Blockchain</span>
        </p>
        
       
    
     
      
    
    
    

   
    <Lottie
            style={{zIndex:-1}}
            options={defaultOptions}
            height={400}
            width={400}
        
          />
    
    </Grid>
    


          </Grid>
        </div>
    )
}

export default Home