import React,{useEffect} from 'react'
import Card from "../components/card"
import {Grid} from "@material-ui/core"
import io from "socket.io-client";
import { connect } from "react-redux";
import { setCurrentUser, setAdmin } from "../redux/user/user.actions";
import { useFormControlUnstyled } from '@mui/material';
let socket;
 function Projects({user,update_user}) {

const [projects,setProjects]=React.useState([])

const ENDPOINT = "http://localhost:5000";


console.log("user",user)

React.useEffect(() => {
    connectSocket();
  }, []);

  

  const connectSocket = () => {
   
      socket = io(ENDPOINT);

      socket.emit(
        "join",
        {
       hi:"hi"
        },
        (error) => {
          if (error) {
            alert(error);
          }
        }
      );

      socket.on("fundChanged", (data) => {
        // setTotalUser(users);
        if(data?.data){
            console.log(data)
            setProjects(data.data)
        
            let currentUser=user
            currentUser.user=data.user
            
             update_user(currentUser)
            
        }
        
      });

     
      socket.on("enter", (data) => {
        // setTotalUser(users);
        console.log("projects", data.data);

        if(data?.data){
            setProjects(data.data)
        }
        
      });
   
    
  };

  const fundProject = (project_id) => {
  
   console.log(user)
    socket.emit(
      "fund",
      {
       project_id:project_id,
       user_id:user.user.user_id,
       amount:user.user.tax_point
      },
      (error) => {
        if (error) {
          console.log(error);
        }
      }
    );
  };




    return (
        <div>
            <Grid container justify='space-between'>
{projects.map(({_id,pool_limit,name,desc,is_active,fund,image_url})=><Grid item lg={6}>
<Card fundProject={fundProject}  other_datas={{project_id:_id, name, image_url  ,is_active, desc, fund ,pool_limit, desc}}></Card>
</Grid>)}

            </Grid>
            
        </div>
    )
}

const stateTo = (state) => ({
    user: state.user?.currentUser,
    admin: state.user?.admin,
  });
  
  const dispatchto = (dispatch) => ({
    update_user: (user) => dispatch(setCurrentUser(user)),
  });
  
  export default connect(stateTo,dispatchto)(Projects);