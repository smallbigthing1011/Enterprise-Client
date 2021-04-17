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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FilesTable, SideBar } from "../../components";

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
  const [close, setClose] = useState(false);
  const classes = useStyles();
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
          md={3}
          lg={3}
          className={close ? classes.sidebarClose : classes.sidebarOpen}
        >
          {close ? "" : <SideBar rolebase="admin"></SideBar>}
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
            <Typography variant="h5">{"Duy"}</Typography>
          </Box>
          <ThemeProvider theme={theme}>
            <Box width="100%" display="flex" justifyContent="flex-end">
              <Link to="/admin/contributions/details/1/upload">
                <Button variant="contained" color="secondary">
                  Submit
                </Button>
              </Link>
              <Button variant="contained" color="secondary">
                Update
              </Button>
            </Box>
          </ThemeProvider>
          <Box className={classes.table}>
            <FilesTable></FilesTable>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContributionDetail;
