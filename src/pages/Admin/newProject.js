import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import Radio from "@material-ui/core/Radio";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import { setCurrentUser } from "../../redux/user/user.actions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `20%`,
    left: `40%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    alignSelf: "center",
    width: "100%",
  },
  paper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    alignSelf: "center",
    width: "50%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    backgroundColor: "white",
    // Fix IE 11 issue.
    padding: 40,
    marginTop: 10,
    position: "relative",
    height: 600,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddUser({ cancel, updatePage, create, history, cur_user, add_user ,admin}) {
  const classes = useStyles();
  const [data, set_data] = React.useState({
    image_url: "",
    name: "",
    desc: "",
    
    pool_limit: "",
  
  
  });

  const [error, seterror] = React.useState("");
  const [flatss, setflats] = React.useState([]);
  const [modalStyle] = React.useState(getModalStyle);

  React.useEffect(() => {
    if (cur_user) {
      history.push("/login");
    }
 
  }, []);








  const check = () => {
    var phoneno = /^\d{10}$/;
    if (!data.image_url) {
      return "image_url cannot be empty";
    }

   

    if (!data.name) {
      return "id cannot be empty";
    }
    if (!data.pool_limit) {
      return "pool_limit cannot be empty";
    }


    return false;
  };

  const Submit = async () => {
    console.log(check());
    if (!check()) {
      try {
        const body = data;
        const response = await fetch(
          `http://localhost:5000/admin/create-project`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        const parseRes = await response.json();
        console.log(parseRes);

        if (parseRes.status) {
       

          toast.success("Project added Successfully");
        } else {
          toast.error(parseRes);
        }
      } catch (err) {
        toast.error("Error");
      }
    } else {
      toast.error(check());
    }
  };

  const onChange = (name, value) => {
    set_data({ ...data, [name]: value });
  };
  console.log(data);
  return (
    <Grid container justify="center">
      <div className="form-responsive" noValidate>
        <h1>New Project</h1>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="image_url"
          label="Project image "
          name="image_url"
          autoComplete="image_url"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />

        <Grid container row justify="space-between">
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: "46%" }}
            name="name"
            label="Project Name"
            type="name"
            id="name"
            autoComplete="name"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: "45%" }}
            name="pool_limit"
            label="Pool limit"
            type="number"
            id="pool_limit"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </Grid>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          
          id="desc"
          label="Project description "
          name="desc"
          autoComplete="desc"
          autoFocus
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
 

       

       

        <Button
          type="submit"
          style={{ marginRight: 20 }}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={Submit}
        >
       Add Project
        </Button>
      </div>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  cur_user: state.user.user,
  admin:state.user.admin
});

const mapDispatchToState = (dispatch) => ({
  add_user: (payload) => dispatch(setCurrentUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToState)(AddUser);
