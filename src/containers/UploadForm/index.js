import {
  Box,
  Button,
  Checkbox,
  createMuiTheme,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Paper,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
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
const UploadForm = () => {
  const classes = useStyles();
  //   const { conaction } = useParams();
  const [close, setClose] = useState(true);
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
          md={4}
          lg={4}
          className={close ? classes.sidebarClose : classes.sidebarOpen}
        >
          {close ? "" : <SideBar rolebase="admin"></SideBar>}
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
              label="Your contribution name"
              variant="outlined"
              fullWidth
            ></TextField>

            <TextField
              label="Choose file"
              type="file"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                multiple: true,
              }}
              fullWidth
            ></TextField>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox name="checkAgree" color="primary" />}
                label="I agree to all Terms and Conditions"
              />
            </FormGroup>
            <ThemeProvider theme={theme}>
              <Box className={classes.btngroup}>
                <Button variant="contained" color="secondary">
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
