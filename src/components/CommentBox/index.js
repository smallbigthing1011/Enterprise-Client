import { Box, Button, Grid, makeStyles, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  commentBox: {
    height: "90vh",
    color: "black",
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
  comment: {
    minHeight: "50px",
  },
  content: {
    width: "100%",
    minHeight: "30px",
    overflow: "visible",
  },
}));
function CommentBox() {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [commentBox, setCommentBox] = useState([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  let cookieData = document.cookie;
  useEffect(() => {
    const fetchData = async () => {
      const tokenData = JSON.parse(cookieData);

      const accountData = await (
        await fetch(`http://localhost:3001/accounts/me`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "GET",
        })
      ).json();
      setUserId(accountData.account.id);
      setName(accountData.account.email);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setCommentBox([
      {
        from: "tester1",
        content: "ok",
      },
      {
        from: "tester1",
        content: "ok",
      },
      {
        from: "tester1",
        content: "ok",
      },
      {
        from: "tester1",
        content: "ok",
      },
      {
        from: "tester1",
        content: "ok",
      },
    ]);
  }, []);
  const handleChangeSubmit = (event) => {
    if (event.key === "Enter") {
      console.log(content);
      const newComment = {
        from: name,
        content: content,
      };
      setCommentBox([...commentBox, newComment]);
    }
  };
  const handleChangeComment = (event) => {
    setContent(event.target.value);
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
        >
          {commentBox.length > 0
            ? commentBox.map((item) => {
                return (
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.comment}
                  >
                    <Grid item xs={5} sm={5} md={5} lg={5}>
                      <Box className={classes.content}>{item.from}</Box>
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7}>
                      <Box className={classes.content}>{item.content}</Box>
                    </Grid>
                  </Grid>
                );
              })
            : "no"}
        </Grid>
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
