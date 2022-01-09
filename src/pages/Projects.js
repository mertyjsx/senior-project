import React from 'react'
import Card from "../components/card"
import {Grid} from "@material-ui/core"
export default function Projects() {

const [projects,setProjects]=React.useState([])


React.useEffect(async ()=>{

    const res = await fetch(`http://localhost:5000/user/projects`, {
        method: "GET",
      
      });

     
   
      const parseRes = await res.json();
     

      console.log("resopnse", parseRes);
      setProjects(parseRes.data)


},[])


    return (
        <div>
            <Grid container justify='space-between'>
<Grid item lg={6}>
<Card></Card>
</Grid>
<Grid item lg={6}>
<Card></Card>
</Grid>
            </Grid>
            
        </div>
    )
}
