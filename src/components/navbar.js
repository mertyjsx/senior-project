
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {setCurrentUser,setAdmin} from "../redux/user/user.actions"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

 function ButtonAppBar(props) {
  const [state, setstate] = React.useState("")
  const classes = useStyles();





  return (
    <div className={classes.root}>
      <div position="static" color="#ff385c" style={{padding: "0 10%"}}>
        <Toolbar>
        <div className='buttonTax'  >Tax Point : 30</div>
          <Typography variant="h6" className={classes.title}>
            
          </Typography>
          {props.cur_user&&<Link to="/projects">
          <div className='buttonApp' color="inherit" >Projects</div>
          </Link>
         
          }
           {props.cur_user&&<Link to="/my-transactions">
          <div className='buttonApp' color="inherit" >Transactions</div>
          </Link>
         
          }
        {!props.cur_user?<Link to="/login">
          <div className='buttonApp' color="inherit" >User Login</div>
          </Link>:
          <Link to="login">
           <div  className='buttonApp' onClick={()=>{
           props.del_user(null)
        


           }}>Disconnect Wallet</div></Link>
          }
        </Toolbar>
      </div>
    </div>
  );
}

const stateto=(state)=>({
cur_user:state.user.currentUser,
admin:state.user.admin
})

const dispatchto=(dispatch)=>({
del_user:()=>dispatch(setCurrentUser(null))
})

export default connect(stateto,dispatchto)(ButtonAppBar)