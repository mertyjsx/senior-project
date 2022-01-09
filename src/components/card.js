import React from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import dues from "./dues.png"
import Linear from "./linearProgres"
import {Grid} from "@material-ui/core"
export default function Card() {



    return (
        <div className="container">
        <div className="card">
            <div className="sneaker">
                <div className="circle2"></div>
                <img src={dues} alt="adidas"/>
            </div>
            <div className="info">
                <h1 className="title">Project Metro</h1>
                <h3>You have 2 months of debt 52 $</h3>
       
        
<div className="progress">
  <div className="progress-value center">
      %30
  </div>
</div>
          

       
                <div className="purchase">
                    <button>Fund</button>
                </div>
            </div>
        </div>
    </div>
        
    )
}
