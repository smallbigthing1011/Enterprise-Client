import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import React from "react";
import { Link } from "react-router-dom";
import AccountsTable from "../AccountsTable";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
  },
  table: {
    borderRadius: "33px 33px 0 0",
    backgroundColor: "#fff",
    boxShadow: " 0px -10px 37px 0px rgba(0,0,0,0.2)",
    minHeight: "80%",
  },
  typo: {
    color: "#0F3057",
    paddingRight: "20px",
    paddingTop: "20px",
  },
  textfield: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  add: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
});

const AccountWrapperBox = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <Typography
          align="right"
          className={classes.typo}
          variant="h5"
        >{`Welcome ${props.user.username}`}</Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={classes.textfield}
        >
          {/* <TextField placeholder="Search for an account"></TextField> */}
        </Box>
      </Box>

      <Box className={classes.table}>
        <Box>
          <Box className={classes.add}>
            <Link to="/account/createAccount">
              <Button variant="text">
                <AddRoundedIcon></AddRoundedIcon> Create account
              </Button>
            </Link>
          </Box>
          <AccountsTable></AccountsTable>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountWrapperBox;
