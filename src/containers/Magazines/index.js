import {
  Box,
  Button,
  Grid,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Magazine, SideBar } from "../../components";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#00587A",
    },
  },
});

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
  link: {
    textDecoration: "none",
  },
  wrapper: {
    width: "70%",
  },
}));

const Magazines = () => {
  const classes = useStyles();
  const [close, setClose] = useState(false);
  const [role, setRole] = useState("");
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(false);
  let cookieData = document.cookie;
  // useEffect(async () => {
  //   const tokenData = JSON.parse(cookieData);
  //   setRole(tokenData.role);
  //   const accountData = await (
  //     await fetch("http://localhost:3001/account/me", {
  //       headers: {
  //         "Content-type": "application/json",
  //         "x-access-token": tokenData.token,
  //       },
  //       method: "GET",
  //     })
  //   ).json();

  //   console.log("useEffect /me from Magazines container");
  //   if (accountData.exitcode === 0) {
  //     setMagazines(magazines.magazines);
  //   }
  // }, []);
  useEffect(async () => {
    const tokenData = JSON.parse(cookieData);
    setRole(tokenData.role);
    setLoading(true);
    const magazinesData = await (
      await fetch("http://localhost:3001/magazine", {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "GET",
      })
    ).json();

    console.log("useEffect from Magazines container");
    if (magazinesData.exitcode === 0) {
      setLoading(false);
      setMagazines(magazinesData.magazines);
      console.log(magazinesData.magazines);
    }
  }, []);

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
          container
          justify="center"
          alignItems="center"
          direction="column"
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={classes.main}
        >
          {role === "manager" || role === "admin" ? (
            <ThemeProvider theme={theme}>
              <Link to="/magazine/createMagazine">
                <Button variant="outlined" color="secondary">
                  Create Magazine
                </Button>
              </Link>
            </ThemeProvider>
          ) : (
            ""
          )}
          <Box
            display="flex"
            justifyContent="flex-start"
            flexWrap="wrap"
            className={classes.wrapper}
          >
            {loading
              ? "loading..."
              : magazines.map((item) => {
                  return (
                    <Link to="/magazines">
                      <Magazine
                        key={item.id}
                        name={item.name}
                        closureDate={item.closureDate}
                        finalClosureDate={item.finalClosureDate}
                        published_year={item.published_year}
                        manager={item.manager.username}
                      ></Magazine>
                    </Link>
                  );
                })}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Magazines;
