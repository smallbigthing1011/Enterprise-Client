import React from "react";
import { Grid, Box, Typography, Button, makeStyles } from "@material-ui/core";
import { SideBar, ContributionsTable } from "../../components";
import { Link } from "react-router-dom";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
const useStyles = makeStyles({
  sidebar: {
    backgroundColor: "#00587A",
    position: "fixed",
    height: "100vh",
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
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid
          item
          container
          justify="center"
          md={3}
          className={classes.sidebar}
        >
          <SideBar rolebase="admin"></SideBar>
        </Grid>
        <Grid item md={3}></Grid>
        <Grid
          container
          justify="space-between"
          alignItems="start"
          direction="column"
          item
          md={9}
          className={classes.main}
        >
          <Box className={classes.title}>
            <Typography variant="h5">{2021}</Typography>
          </Box>
          <Box className={classes.table}>
            <Box>
              <Box className={classes.add}>
                <Link to="/admin/contributions/createContribution">
                  <Button variant="text">
                    <AddRoundedIcon></AddRoundedIcon> Create contribution
                  </Button>
                </Link>
              </Box>
              <ContributionsTable></ContributionsTable>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default MagazineDetail;
