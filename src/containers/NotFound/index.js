import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    background: "#E7E7DE",
    color: "#00587A",
  },
  title: {
    marginBottom: "150px",
  },
});

const NotFound = () => {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        className={classes.title}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">OOPS! PAGE NOT FOUND</Typography>
      </Box>
      <Typography variant="h5">You are directing for wrong url</Typography>
    </Box>
  );
};

export default NotFound;
