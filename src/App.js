import logo from "./logo.svg";
import React, { useEffect } from "react";
import "./App.css";
import Navbar from "../src/components/navbar";
import Dues from "./pages/Dues";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Home from "./pages/home";
import Due from "./components/Dues";
import Transactions from "./pages/Transactions";
import Projects from "./pages/Projects";
import AdminLogin from "./pages/Admin/adminLogin";
import Login from "./pages/login";
import AdminAddTransaction from "./pages/Admin/newTransaction";
import Admin from "./pages/Admin/adminDashboard";
import AdminNavbar from "./components/AdminNavbar";
import Register from "./pages/register";
import { ToastContainer, toast } from "react-toastify";
import { setCurrentUser, setAdmin } from "./redux/user/user.actions";
import { connect } from "react-redux";
import Announce from "./pages/Announce";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
function App({ user, admin, del_user }) {
  const [state, setstate] = React.useState("");
  const { publicKey, sendTransaction } = useWallet();

  const verifyJwt = async () => {
    const body = { token: user?.token };
    const response = await fetch(`http://localhost:5000/auth/verify`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const parseRes = await response.json();
    if(!parseRes.status){
      del_user("");
    }
  };

  useEffect(() => {
    console.log("user",user)
    if (!(user?.token)) {
      del_user("");
    } else {
      verifyJwt();
    }
  }, [publicKey]);

  console.log("app pıublic", publicKey);

  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            false ? (
              <Redirect to="/" />
            ) : (
              [<Navbar {...props} />, <Home {...props} />]
            )
          }
        />

        <Route
          exact
          path="/announce"
          render={(props) =>
            !user ? (
              <Redirect to="/login" />
            ) : (
              [<Navbar {...props} />, <Announce {...props} />]
            )
          }
        />

        <Route
          exact
          path="/my-transactions"
          render={(props) =>
            !user ? (
              <Redirect to="/login" />
            ) : (
              [<Navbar {...props} />, <Transactions {...props} />]
            )
          }
        />
        <Route
          exact
          path="/projects"
          render={(props) =>
            !user ? (
              <Redirect to="/login" />
            ) : (
              [<Navbar {...props} />, <Projects {...props} />]
            )
          }
        />

        <Route
          exact
          path="/admin"
          render={(props) =>
            !admin ? (
              <Redirect to="/admin-login" />
            ) : (
              [<AdminNavbar {...props} />, <Admin {...props} />]
            )
          }
        />

        <Route
          exact
          path="/admin-login"
          render={(props) =>
            false ? (
              <Redirect to="/admin" />
            ) : (
              [<AdminNavbar {...props} />, <AdminLogin {...props} />]
            )
          }
        />

        <Route
          exact
          path="/login"
          render={(props) =>
            user ? (
              <Redirect to="/" />
            ) : (
              [<Navbar {...props} />, <Login {...props} />]
            )
          }
        />

        <Route
          exact
          path="/register"
          render={(props) =>
            user ? (
              <Redirect to="/" />
            ) : (
              [<Navbar {...props} />, <Register {...props} />]
            )
          }
        />
      </Switch>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

const stateTo = (state) => ({
  user: state.user?.currentUser,
  admin: state.user?.admin,
});

const dispatchto = (dispatch) => ({
  del_user: () => dispatch(setCurrentUser(null)),
});

export default connect(stateTo, dispatchto)(App);
