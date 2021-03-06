import {
  Box,
  Button,
  CircularProgress,
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
  main: {
    minHeight: "100vh",
    backgroundColor: "#E7E7DE",
  },
  papper: {
    minWidth: "40%",
    width: "60%",
    minHeight: "80%",
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
}));
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#0F3057",
    },
  },
});
const MagazineForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { action, idmagazine } = useParams();

  const [close, setClose] = useState(true);
  const [loading, setLoading] = useState(false);
  const [magazineInfo, setMagazineInfo] = useState({
    manager_id: "",
    name: "",
    published_year: "",
    closureDate: "",
    finalClosureDate: "",
  });

  useEffect(() => {
    let cookieData = document.cookie;
    const tokenData = JSON.parse(cookieData);
    let newMagazineInfo = { ...magazineInfo };
    console.log("ok");
    newMagazineInfo.manager_id = tokenData.id;
    setMagazineInfo(newMagazineInfo);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (action !== "createMagazine") {
        let cookieData = document.cookie;
        const tokenData = JSON.parse(cookieData);
        setLoading(true);
        const magazineData = await (
          await fetch(`${API_ENDPOINT}/magazines/${idmagazine}`, {
            headers: {
              "Content-type": "application/json",
              "x-access-token": tokenData.token,
            },
            method: "GET",
          })
        ).json();

        if (magazineData.exitcode === 0) {
          const convertedClosureDate = new Date(
            magazineData.magazine.closureDate
          );
          const convertedFinalClosureDate = new Date(
            magazineData.magazine.finalClosureDate
          );
          const newMagazineInfo = {
            manager_id: magazineData.magazine.manager._id,
            name: magazineData.magazine.name,
            published_year: magazineData.magazine.published_year,
            closureDate: convertedClosureDate.toISOString().substr(0, 10),
            finalClosureDate: convertedFinalClosureDate
              .toISOString()
              .substr(0, 10),
          };
          setMagazineInfo(newMagazineInfo);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);
  const handleChangeMagazine = (event) => {
    let newMagazine = { ...magazineInfo };
    newMagazine[event.target.name] = event.target.value;
    setMagazineInfo(newMagazine);
  };
  const handleClick = () => {
    setClose(!close);
  };

  const handleClickSave = async () => {
    let cookieData = document.cookie;
    const tokenData = JSON.parse(cookieData);
    const newMagazine = await (
      await fetch(`${API_ENDPOINT}/magazines`, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "POST",
        body: JSON.stringify(magazineInfo),
      })
    ).json();
    if (newMagazine.exitcode === 0) {
      history.push("/magazines");
    }
  };

  const handleClickUpdate = async () => {
    let cookieData = document.cookie;
    const tokenData = JSON.parse(cookieData);

    const updatedMagazine = await (
      await fetch(`${API_ENDPOINT}/magazines/${idmagazine}`, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "PUT",
        body: JSON.stringify(magazineInfo),
      })
    ).json();
    if (updatedMagazine.exitcode === 0) {
      history.push("/magazines");
    }
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
          justify="center"
          alignItems="center"
        >
          {loading ? (
            <CircularProgress></CircularProgress>
          ) : (
            <Box component={Paper} className={classes.papper} padding={3}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={magazineInfo.name}
                onChange={handleChangeMagazine}
              ></TextField>
              <TextField
                label="Published Year"
                variant="outlined"
                fullWidth
                type="number"
                name="published_year"
                value={magazineInfo.published_year}
                onChange={handleChangeMagazine}
              ></TextField>
              <TextField
                label="Closure Date"
                variant="outlined"
                fullWidth
                type="date"
                name="closureDate"
                InputLabelProps={{
                  shrink: true,
                }}
                value={magazineInfo.closureDate}
                onChange={handleChangeMagazine}
              ></TextField>
              <TextField
                label="Final Closure Date"
                variant="outlined"
                fullWidth
                type="date"
                name="finalClosureDate"
                InputLabelProps={{
                  shrink: true,
                }}
                value={magazineInfo.finalClosureDate}
                onChange={handleChangeMagazine}
              ></TextField>
              {action === "createMagazine" && (
                <ThemeProvider theme={theme}>
                  <Box className={classes.btngroup}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClickSave}
                    >
                      Create
                    </Button>
                  </Box>
                </ThemeProvider>
              )}

              {action === "editMagazine" && (
                <ThemeProvider theme={theme}>
                  <Box className={classes.btngroup}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleClickUpdate}
                    >
                      Update
                    </Button>
                  </Box>
                </ThemeProvider>
              )}

              {action === "viewMagazine" && ""}
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MagazineForm;
