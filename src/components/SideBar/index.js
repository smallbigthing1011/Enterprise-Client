import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  item: {
    width: "100%",
  },
  button: {
    color: "white",
  },
  role: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    marginTop: "40px",
    paddingLeft: "20px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));
function SideBar() {
  const classes = useStyles();
  const history = useHistory();

  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  let cookieData = document.cookie;
  useEffect(async () => {
    const tokenData = JSON.parse(cookieData);
    const personalData = await (
      await fetch("http://localhost:3001/account/me", {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "GET",
      })
    ).json();
    console.log(personalData);
    setRole(personalData.account.role);
    setId(personalData.account.id);
  }, []);

  const handleClickLogout = () => {
    document.cookie = `${cookieData}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Typography
        className={classes.role}
        variant="h6"
      >{`Role - ${role}`}</Typography>
      <List className={classes.item}>
        {role === "admin" && (
          <Box>
            <Link to="/accounts" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Accounts" />
              </ListItem>
            </Link>
            <Link to="/magazines" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Magazines" />
              </ListItem>
            </Link>
          </Box>
        )}
        {role === "manager" && (
          <Box>
            <Link to="/accounts" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Accounts" />
              </ListItem>
            </Link>
            <Link to="/magazines" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Magazines" />
              </ListItem>
            </Link>
          </Box>
        )}
        {role === "coordinator" && (
          <Box>
            <Link to={`/account/editAccount/${id}`} className={classes.link}>
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
            <Link to="/magazines" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Magazines" />
              </ListItem>
            </Link>
          </Box>
        )}
        {role === "student" && (
          <Box>
            <Link to={`/account/editAccount/${id}`} className={classes.link}>
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
            <Link to="/magazines" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Magazines" />
              </ListItem>
            </Link>
          </Box>
        )}
      </List>
      <List className={classes.item}>
        <ListItem button>
          <ListItemText
            primary="Logout"
            onClick={handleClickLogout}
          ></ListItemText>
        </ListItem>
      </List>
    </div>
  );
}

export default SideBar;
