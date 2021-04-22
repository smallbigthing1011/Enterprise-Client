import {
  Box,
  Button,
  createMuiTheme,
  Grid,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FilesTable, CommentBox, SideBar } from "../../components";
import API_ENDPOINT from "../../endpoint";

const useStyles = makeStyles({
  sidebarOpen: {
    backgroundColor: "#00587A",
    position: "fixed",
    height: "100vh",
    transition: "ease 0.5s",
  },
  sidebarClose: {
    height: "0",
  },
  commentOpen: {
    backgroundColor: "#E7E7DE",
    position: "fixed",
    right: "0",
    height: "100vh",
    width: "100%",
    transition: "linear 0.5s",
  },
  commentClose: {
    height: "0",
    width: "0",
  },
  menuBtnOpen: {
    height: "30px",
    color: "#fff",
    position: "fixed",
    zIndex: "999",
  },
  menuBtnClose: {
    height: "30px",
    color: "#000000",
    position: "fixed",
    zIndex: "999",
  },
  commentBtnOpen: {
    height: "30px",
    color: "#000000",
    position: "fixed",
    right: "0",
    bottom: "0",
    zIndex: "9999",
  },
  commentBtnClose: {
    height: "30px",
    right: "0",
    bottom: "0",
    color: "#000000",
    position: "fixed",
    zIndex: "9999",
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
    textAlign: "right",
    paddingLeft: "20px",
    paddingBottom: "20px",
  },
});

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#0F3057",
    },
  },
});
const ContributionDetail = () => {
  const { idcon, state } = useParams();
  const [closeSideBar, setCloseSideBar] = useState(true);
  const [closeComment, setCloseComment] = useState(true);
  const [files, setFiles] = useState([]);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const classes = useStyles();
  let cookieData = document.cookie;
  const handleClickSideBar = () => {
    setCloseSideBar(!closeSideBar);
  };
  const handleClickComment = () => {
    setCloseComment(!closeComment);
  };
  useEffect(() => {
    const tokenData = JSON.parse(cookieData);
    setRole(tokenData.role);

    const fetchData = async () => {
      const contributionData = await (
        await fetch(`${API_ENDPOINT}/contributions/${idcon}`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "GET",
        })
      ).json();
      if (contributionData.exitcode === 0) {
        setFiles(contributionData.contribution.files);
        setEmail(contributionData.contribution.contributorEmail);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Button
        className={closeSideBar ? classes.menuBtnClose : classes.menuBtnOpen}
        onClick={handleClickSideBar}
      >
        <MenuIcon></MenuIcon>
      </Button>
      <Grid container>
        <Grid
          item
          container
          justify="center"
          xs={4}
          sm={4}
          md={2}
          lg={2}
          className={closeSideBar ? classes.sidebarClose : classes.sidebarOpen}
        >
          {closeSideBar ? "" : <SideBar></SideBar>}
        </Grid>

        <Grid
          container
          justify="space-between"
          alignItems="start"
          direction="column"
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={classes.main}
        >
          <Box className={classes.title}>
            <Typography variant="h5">{email}</Typography>
          </Box>
          {state === 0 || state === 1 ? (
            <Box width="100%" display="flex" justifyContent="flex-end">
              {role === "student" && (
                <Button variant="contained" color="secondary" disabled>
                  Submit
                </Button>
              )}
            </Box>
          ) : (
            <ThemeProvider theme={theme}>
              <Box width="100%" display="flex" justifyContent="flex-end">
                {role === "student" && (
                  <Link to={`/upload/contribution/${idcon}/submit`}>
                    <Button variant="contained" color="secondary">
                      Submit
                    </Button>
                  </Link>
                )}
              </Box>
            </ThemeProvider>
          )}
          <Box className={classes.table}>
            <FilesTable files={files}></FilesTable>
          </Box>
        </Grid>

        <Grid
          item
          container
          justify="center"
          xs={5}
          sm={5}
          md={5}
          lg={5}
          className={closeComment ? classes.commentClose : classes.commentOpen}
        >
          {closeComment ? "" : <CommentBox idcon={idcon}></CommentBox>}
        </Grid>
      </Grid>
      <Button
        className={
          closeComment ? classes.commentBtnClose : classes.commentBtnOpen
        }
        onClick={handleClickComment}
      >
        <ModeCommentIcon></ModeCommentIcon>
      </Button>
    </div>
  );
};

export default ContributionDetail;
