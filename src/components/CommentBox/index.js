import { Box, Button, Grid, makeStyles, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useEffect, useState } from "react";
import API_ENDPOINT from "../../endpoint";
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
  name: {
    fontSize: "10px",
  },
}));
function CommentBox(props) {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [commentBox, setCommentBox] = useState([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  let cookieData = document.cookie;
  useEffect(() => {
    const tokenData = JSON.parse(cookieData);
    setUserId(tokenData.id);
    setName(tokenData.email);
    console.log(props.idcon);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const tokenData = JSON.parse(cookieData);
      const commentsData = await (
        await fetch(`${API_ENDPOINT}/comments/contribution/${props.idcon}`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "GET",
        })
      ).json();
      setCommentBox(commentsData.comments);
    };

    fetchData();
  }, []);
  const handleChangeSubmit = async (event) => {
    const tokenData = JSON.parse(cookieData);
    if (event.key === "Enter") {
      const cloneComment = {
        commenterEmail: name,
        content: content,
      };
      const newComment = await (
        await fetch(`${API_ENDPOINT}/comments/`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "POST",
          body: JSON.stringify({
            contribution: props.idcon,
            content: content,
          }),
        })
      ).json();
      setCommentBox([...commentBox, cloneComment]);
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
                    <Box className={classes.name}>{item.commenterEmail}</Box>
                    <Box className={classes.content}>{item.content}</Box>
                  </Grid>
                );
              })
            : ""}
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
