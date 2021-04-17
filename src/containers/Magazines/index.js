import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Magazine, SideBar } from "../../components";

const useStyles = makeStyles({
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
});

const role = "admin";
const Magazines = () => {
  const classes = useStyles();
  const [close, setClose] = useState(false);
  const [magazines, setMagazines] = useState([]);
  useEffect(() => {
    setMagazines([
      {
        name: "magazine",
        enddate1: "05-05-2021",
        enddate2: "15-05-2021",
        isLocked: false,
        year: "2021",
      },
      {
        name: "magazine",
        enddate1: "05-05-2021",
        enddate2: "15-05-2021",
        isLocked: true,
        year: "2021",
      },
    ]);
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
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={classes.main}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            flexWrap="wrap"
            className={classes.wrapper}
          >
            {magazines.map((item, index) => {
              return (
                <Link
                  to={
                    role !== "student"
                      ? `/admin/magazines/${index}`
                      : `/admin/contributions/details/${index}`
                  }
                >
                  <Magazine
                    key={index}
                    isLocked={item.isLocked}
                    name={item.name}
                    enddate1={item.enddate1}
                    enddate2={item.enddate2}
                    year={item.year}
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
