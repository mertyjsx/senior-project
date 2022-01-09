import React from 'react'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import dues from "./dues.png"
import Linear from "./linearProgres"
import {Grid} from "@material-ui/core"
export default function Card(props) {
    const {image_url,project_id,pool_limit,desc,name,is_active,fund}=props.other_datas



console.log("props",props)

    return (
        <div className="container">
        <div className="card">
            <div className="sneaker">
              
                <img src={image_url} alt="adidas"/>
            </div>
            <div className="info">
                <h1 className="title">{name}</h1>
                <h3>{desc}</h3>
       
        
<div className="progress">
  <div className="progress-value center" style={{width:Math.floor(fund/pool_limit*100)*5}}>
    {Math.floor(fund/pool_limit*100)}%
  </div>
</div>
          

       
                <div className="purchase">
                    <button onClick={()=>props.fundProject(project_id)}>Fund</button>
                </div>
            </div>
        </div>
    </div>
        
    )
}
