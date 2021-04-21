import {
  Box,
  Button,
  createMuiTheme,
  Grid,
  makeStyles,
  Paper,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SideBar } from "../../components";

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
const ContributionForm = () => {
  const classes = useStyles();
  const [close, setClose] = useState(false);
  const [title, setTitle] = useState("");
  const { idcon } = useParams();
  const history = useHistory();

  const handleClickSave = async () => {
    const cookieData = document.cookie;
    const tokenData = JSON.parse(cookieData);
    const updatedContribution = await (
      await fetch(`http://localhost:3001/contributions/${idcon}`, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        body: JSON.stringify({ title }),
        method: "PUT",
      })
    ).json();
    if (updatedContribution.exitcode === 0) {
      history.push(`/contribution/${idcon}`);
    }
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleClick = () => {
    setClose(!close);
  };
  return (
    <div>
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
              variant="outlined"
              fullWidth
              onChange={handleChange}
            ></TextField>

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

export default ContributionForm;
