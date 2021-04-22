import {
  Box,
  Button,
  Checkbox,
  createMuiTheme,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SideBar } from "../../components";
import API_ENDPOINT from "../../endpoint";

const useStyles = makeStyles((theme) => ({
  sidebarOpen: {
    backgroundColor: "#00587A",
    position: "fixed",
    height: "100vh",
    transition: "ease-in 0.5s",
  },
  sidebarClose: {
    height: "0",
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
  main: {
    minHeight: "100vh",
    backgroundColor: "#E7E7DE",
  },
  papper: {
    minWidth: "40%",
    width: "60%",
    minHeight: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  btngroup: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  btn: {
    height: "100%",
  },
}));
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#0F3057",
    },
  },
});
const UploadForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { idmagazine, action, idcon } = useParams();
  const [close, setClose] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [agree, setAgree] = useState(false);
  const [sarticle, setSarticle] = useState(null);
  const [spictures, setSpictures] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleClick = () => {
    setClose(!close);
  };
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeAgree = () => {
    setAgree(!agree);
  };
  const handleChangeArticle = (event) => {
    setSarticle(event.target.files[0]);
  };
  const handleChangePictures = (event) => {
    setSpictures(event.target.files);
  };
  const handleClickSave = () => {
    if (action === "upload") {
      if (agree === false) setOpen(true);
      else {
        let cookieData = document.cookie;
        const tokenData = JSON.parse(cookieData);
        const data = new FormData();
        data.append("magazine", idmagazine);
        data.append("title", title);
        data.append("article", sarticle);
        let pictures = Array.from(spictures);
        pictures.forEach((picture) => data.append("pictures", picture));
        data.append("agreement", agree);
        axios
          .post(`${API_ENDPOINT}/contributions`, data, {
            headers: {
              "x-access-token": tokenData.token,
            },
          })
          .then((res) => {
            if (res.statusText === "OK") {
              history.push("/magazines");
            }
          });
      }
    } else if (action === "submit") {
      if (agree === false) setOpen(true);
      else {
        let cookieData = document.cookie;
        const tokenData = JSON.parse(cookieData);
        const data = new FormData();
        data.append("title", title);
        data.append("article", sarticle);
        let pictures = Array.from(spictures);
        pictures.forEach((picture) => data.append("pictures", picture));
        data.append("agreement", agree);
        axios
          .post(`${API_ENDPOINT}/files/contribution/${idcon}`, data, {
            headers: {
              "x-access-token": tokenData.token,
            },
          })
          .then((res) => {
            history.push("/magazines");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        message="You must agree to the terms and conditions!"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              Close
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Button
        className={close ? classes.menuBtnClose : classes.menuBtnOpen}
        onClick={handleClick}
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
          className={close ? classes.sidebarClose : classes.sidebarOpen}
        >
          {close ? "" : <SideBar></SideBar>}
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={classes.main}
          container
          alignContent="center"
          justify="center"
        >
          <Box component={Paper} className={classes.papper} padding={3}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            ></TextField>
            <label for="article">Choose Article</label>
            <input
              type="file"
              name="article"
              accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
              onChange={handleChangeArticle}
            ></input>
            <label for="pictures">Choose Picture</label>
            <input
              type="file"
              name="pictures"
              multiple
              accept="image/*"
              onChange={handleChangePictures}
            ></input>

            <FormGroup row name="agreement" onChange={handleChangeAgree}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I agree to all Terms and Conditions"
              />
            </FormGroup>
            <ThemeProvider theme={theme}>
              <Box className={classes.btngroup}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClickSave}
                >
                  Save
                </Button>
              </Box>
            </ThemeProvider>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default UploadForm;
