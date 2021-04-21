import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import MenuIcon from "@material-ui/icons/Menu";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ContributionsTable, SideBar } from "../../components";

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
  table: {
    borderRadius: "33px 33px 0 0",
    backgroundColor: "#fff",
    boxShadow: " 0px -10px 37px 0px rgba(0,0,0,0.2)",
    minHeight: "80%",
    width: "100%",
  },
  title: {
    textAlign: "left",
    paddingLeft: "20px",
    paddingBottom: "20px",
  },
  add: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
});
const MagazineDetail = () => {
  const [close, setClose] = useState(true);
  const [role, setRole] = useState("");
  const [magazine, setMagazine] = useState("");
  const [magazineState, setMagazineState] = useState(0);
  const { idmagazine } = useParams();
  const classes = useStyles();
  let cookieData = document.cookie;

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = JSON.parse(cookieData);
      const magazineData = await (
        await fetch(`http://localhost:3001/magazines/${idmagazine}`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "GET",
        })
      ).json();
      setMagazine(magazineData.magazine);
      const current = new Date();
      const closureDate = new Date(magazineData.magazine.closureDate);
      const finalClosureDate = new Date(magazineData.magazine.finalClosureDate);
      if (current < closureDate) {
        setMagazineState(0);
      } else if (current > finalClosureDate) {
        setMagazineState(2);
      } else {
        setMagazineState(1);
      }

      setRole(tokenData.role);
    };
    fetchData();
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
          md={2}
          lg={2}
          className={close ? classes.sidebarClose : classes.sidebarOpen}
        >
          {close ? "" : <SideBar></SideBar>}
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
            <Typography variant="h5" align="right">
              {magazine.name}
            </Typography>
            <Typography variant="h5" align="right">
              {magazine.published_year}
            </Typography>
            {role === "admin" && <Button>Download all</Button>}
            {role === "manager" && <Button>Download all</Button>}
          </Box>
          <Box className={classes.table}>
            <Box>
              {role === "student" ? (
                <Box className={classes.add}>
                  {magazineState === 0 ? (
                    <Link to={`/upload/${idmagazine}/upload`}>
                      <Button variant="text">
                        <AddRoundedIcon></AddRoundedIcon> Create contribution
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="text" disabled>
                      <AddRoundedIcon></AddRoundedIcon> Create contribution
                    </Button>
                  )}
                </Box>
              ) : (
                ""
              )}
              <ContributionsTable
                role={role}
                state={magazineState}
              ></ContributionsTable>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default MagazineDetail;
