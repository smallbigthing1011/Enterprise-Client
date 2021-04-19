import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContributionsTable, SideBar } from "../../components";

const useStyles = makeStyles({
  sidebarOpen: {
    backgroundColor: "#00587A",
    position: "fixed",
    height: "100vh",
    transition: "ease-in 0.5s",
  },
  sidebarClose: {
    height: "0",
  },
  menuBtnOpen: {
    height: "30px",
    color: "#fff",
    position: "fixed",
    zIndex: "999",
  },
  menuBtnClose: {
    height: "30px",
    color: "#000000",
    position: "fixed",
    zIndex: "999",
  },
  main: {
    minHeight: "100vh",
    backgroundColor: "#E7E7DE",
  },
  table: {
    borderRadius: "33px 33px 0 0",
    backgroundColor: "#fff",
    boxShadow: " 0px -10px 37px 0px rgba(0,0,0,0.2)",
    minHeight: "80%",
    width: "100%",
  },
  title: {
    textAlign: "left",
    paddingLeft: "20px",
    paddingBottom: "20px",
  },
  add: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
});
const MagazineDetail = () => {
  const [close, setClose] = useState(true);
  const [role, setRole] = useState("");
  const classes = useStyles();
  let cookieData = document.cookie;
  useEffect(() => {
    const tokenData = JSON.parse(cookieData);
    setRole(tokenData.role);
  }, []);
  const handleClick = () => {
    setClose(!close);
  };
  return (
    <div>
      <Button
        className={close ? classes.menuBtnClose : classes.menuBtnOpen}
        onClick={handleClick}
      >
        <MenuIcon></MenuIcon>
      </Button>
      <Grid container>
        <Grid
          item
          container
          justify="center"
          xs={4}
          sm={4}
          md={4}
          lg={4}
          className={close ? classes.sidebarClose : classes.sidebarOpen}
        >
          {close ? "" : <SideBar rolebase="admin"></SideBar>}
        </Grid>

        <Grid
          container
          justify="space-between"
          alignItems="start"
          direction="column"
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={classes.main}
        >
          <Box className={classes.title}>
            <Typography variant="h5" align="right">
              {2021}
            </Typography>
          </Box>
          <Box className={classes.table}>
            <Box>
              {role === "student" ? (
                <Box className={classes.add}>
                  <Link to="/admin/contributions/createContribution">
                    <Button variant="text">
                      <AddRoundedIcon></AddRoundedIcon> Create contribution
                    </Button>
                  </Link>
                </Box>
              ) : (
                ""
              )}
              <ContributionsTable role={role}></ContributionsTable>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default MagazineDetail;
