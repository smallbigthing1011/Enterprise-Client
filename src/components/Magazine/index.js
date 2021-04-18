import { Box, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";

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
  const [overClosureDate, setoverClosureDate] = useState(false);
  const [overFinalClosureDate, setoverFinalClosureDate] = useState(false);
  useEffect(() => {
    const { closureDate, finalClosureDate } = props;
    try {
      const convertedClosureDate = new Date(closureDate);
      const convertedFinalClosureDate = new Date(finalClosureDate);
      const current = new Date();
      if (current > convertedClosureDate && current < convertedFinalClosureDate)
        setoverClosureDate(true);
      else if (
        current > convertedClosureDate &&
        current > convertedFinalClosureDate
      ) {
        setoverClosureDate(true);
        setoverFinalClosureDate(true);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        component={Paper}
        className={classes.root}
        border={() => {
          if (overClosureDate && overFinalClosureDate === false) {
            return "#F7EA00 4px solid";
          } else if (overClosureDate && overFinalClosureDate) {
            return "#BE0000 4px solid";
          } else return "#9EDE73 4px solid";
        }}
      >
        <Box>{props.name}</Box>
        <Box>{props.manager}</Box>
        <Box
          className={classes.date}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box>{props.closureDate}</Box>
          <Box>{props.finalClosureDate}</Box>
        </Box>
        <Box className={classes.year}>{props.publishedYear}</Box>
      </Box>
    </div>
  );
};

export default Magazine;
