import React, { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import { ToastContainer, toast } from "react-toastify";
import {Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL} from "@solana/web3.js"
import * as solanaWeb3 from '@solana/web3.js';
import BackspaceIcon from "@material-ui/icons/Backspace";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import Modal from "./Modal";
import SolanaProvider from "../components/SolanaSetup"
import SolanaTransaction from "../components/SolanaTransaction"
import Modal2 from "./Modal2";


import axios from "axios";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "80vh",
  },
});

function StickyHeadTable({ user, history }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [id, setid] = React.useState(0);
  const [account, setAccount] = useState(); 
  const [selected, set_selected] = React.useState(0);
  const [selected2, set_selected2] = React.useState(0);
  const [open2, setopen2] = React.useState(0);
  const [open3, setopen3] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);
  const [loading, setloading] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData(
    _id,
    created_at,
    sender,
    desc,
    amount,
    tax_rate,

    is_tax_paid
  ) {
    return {
      _id,
      created_at,
      sender,
      desc,
      amount,
      tax_rate,

      is_tax_paid,
    };
  }

  const columns = [
    { id: "_id", label: "transaction id", minWidth: 30 },
    { id: "created_at", label: "created at", minWidth: 60 },
    { id: "sender", label: "sender", minWidth: 40 },
    { id: "desc", label: "description", minWidth: 40 },
    { id: "amount", label: "amount", minWidth: 10 },
    {
      id: "tax_rate",
      label: "tax rate",
      minWidth: 50,
    },
    {
      id: "is_tax_paid",
      label: "payment",
      minWidth: 20,
    },
  ];

  React.useEffect(() => {
    Update();
  }, []);

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }
  useEffect(() => {

    

    async function load() {
   

        let fromKeypair = Keypair.generate();
        let toKeypair = Keypair.generate();
        let transaction = new Transaction();
       
      
    }
   
    load();
   }, []);

  const Update = async () => {
    let arr = [];
    setloading(true);

    try {
      const res = await fetch(`http://localhost:5000/user/transactions?user_id=${user.user_id}`, {
        method: "GET",
      
      });

     
   
      const parseRes = await res.json();
     

      console.log("resopnse", parseRes);
      parseRes.data.map((item) => {
        arr.push(
          createData(
            item._id,
            getFormattedDate(new Date(item.createdAt)),
            item.sender,

            item.desc,
            item.amount,
            item.tax_rate,

            item.is_tax_paid ? <div>paid</div> :  <SolanaTransaction transaction_id={item._id} user_id={user.user_id} amount={item.amount} reload={Update}></SolanaTransaction>
          )
        );
      });

      setRows(arr);

      setloading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!loading)
    return (
      <Paper className={classes.root}>
       
        <Modal
          selectedUser={selected}
          open={open2}
          Content={<div></div>}
        ></Modal>
        <Modal2
          selectedUser={selected2}
          open={open3}
          cancel={() => setopen3(false)}
        ></Modal2>

        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        
       <SolanaProvider></SolanaProvider>
      </Paper>
    );
  else return <CircularProgress></CircularProgress>;
}
const mapStateToProps = (state) => ({
  user: state.user?.currentUser?.user,
});

export default connect(mapStateToProps)(StickyHeadTable);
