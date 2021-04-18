import { Box, makeStyles, Paper, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    width: "200px",
    height: "200px",
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
  const [deadline, setDeadline] = useState({
    closureDate: "",
    finalClosureDate: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      const returnTypeClosure = new Date(props.closureDate);
      const returnTypeFinalClosure = new Date(props.finalClosureDate);
      const current = new Date();

      // const convertedClosure =  returnTypeClosure.toDateString();
      // const convertedFinalClosure = returnTypeFinalClosure.toDateString();
      let newDeadline = { ...deadline };
      newDeadline.closureDate = returnTypeClosure.toDateString();
      newDeadline.finalClosureDate = returnTypeFinalClosure.toDateString();
      setDeadline(newDeadline);
      setLoading(false);

      if (current > returnTypeClosure && current < returnTypeFinalClosure) {
        setBorder("#F7EA00");
      } else if (
        current > returnTypeClosure &&
        current > returnTypeFinalClosure
      ) {
        setBorder("#BE0000");
      } else {
        setBorder("#9EDE73");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
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
        <Box fontWeight="bold">{props.name}</Box>

        {loading ? (
          <CircularProgress></CircularProgress>
        ) : (
          <Box
            className={classes.date}
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box>{deadline.closureDate}</Box>
            <Box>{deadline.finalClosureDate}</Box>
          </Box>
        )}
        <Box className={classes.year}>{props.manager}</Box>
        <Box className={classes.year}>{props.published_year}</Box>
      </Box>
    </div>
  );
};

export default Magazine;
