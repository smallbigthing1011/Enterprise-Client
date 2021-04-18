import { Box, Button, Grid, makeStyles, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useState } from "react";
//   import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  commentBox: {
    height: "90vh",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  form: {
    width: "100%",
  },
}));
function CommentBox() {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const handleChangeSubmit = () => {
    console.log(comment);
  };
  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={classes.commentBox}
        ></Grid>
        <Grid item container xs={12} sm={12} md={12} lg={12}>
          <form onKeyDown={handleChangeSubmit} className={classes.form}>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                fullWidth
                placeholder="comment here..."
                onChange={handleChangeComment}
              ></TextField>
              <Button onClick={handleChangeSubmit}>
                <SendIcon></SendIcon>
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default CommentBox;
