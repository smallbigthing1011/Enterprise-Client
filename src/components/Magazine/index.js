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

  const [border, setBorder] = useState("");
  useEffect(() => {
    const { closureDate, finalClosureDate } = props;
    console.log(closureDate);
    try {
      const convertedClosureDate = new Date(closureDate);
      const convertedFinalClosureDate = new Date(finalClosureDate);
      const current = new Date();
      if (
        current > convertedClosureDate &&
        current < convertedFinalClosureDate
      ) {
        setBorder("#F7EA00");
      } else if (
        current > convertedClosureDate &&
        current > convertedFinalClosureDate
      ) {
        setBorder("#BE0000");
      } else {
        setBorder("#9EDE73");
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
        border={`4px solid ${border}`}
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
        <Box className={classes.year}>{props.published_year}</Box>
      </Box>
    </div>
  );
};

export default Magazine;
