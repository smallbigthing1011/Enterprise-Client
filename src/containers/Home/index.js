import { Grid, makeStyles, Typography } from "@material-ui/core";
import "fontsource-roboto";
import React from "react";
import { Link } from "react-router-dom";
import background from "../../images/bg-gw.png";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background}), no-repeat center`,
    backgroundSize: "cover",
  },
  container: {
    maxWidth: "80vw",
  },
  description: {
    marginTop: "100px",
    color: "white",
    fontSize: "25px",
  },
  login: {
    color: "white",
  },
  name: {
    fontWeight: "bold",
    textDecoration: "underline #008891",
    color: "white",
  },
}));
const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container justify="center" className={classes.root}>
        <Grid container item md={12} className={classes.container}>
          <Grid item md={12}>
            <Link to="/login">
              <Typography className={classes.login} align="right" variant="h6">
                Login
              </Typography>
            </Link>

            <Grid item md={12}>
              <Typography className={classes.name} variant="h4">
                UNIVERSITY OF GREENWICH
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Typography className={classes.description}>
                This is the magazine management system which belongs to
                Greenwich University
              </Typography>
            </Grid>
            <Grid item md={7}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
