import { Box, makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    width: "150px",
    height: "150px",
    margin: "20px",
    padding: "20px",
  },
  date: {
    borderLeft: "2px solid #00587A",
    paddingLeft: "20px",
    height: "50%",
  },
  year: {
    textAlign: "right",
  },
});
const Magazine = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        component={Paper}
        className={classes.root}
        border={props.isLocked ? "#BE0000 4px solid" : "#9EDE73 4px solid"}
      >
        <Box>{props.name}</Box>
        <Box
          className={classes.date}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box>{props.enddate1}</Box>
          <Box>{props.enddate2}</Box>
        </Box>
        <Box className={classes.year}>{props.year}</Box>
      </Box>
    </div>
  );
};

export default Magazine;
