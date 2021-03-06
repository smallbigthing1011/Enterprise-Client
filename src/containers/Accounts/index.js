import { Button, CircularProgress, Grid, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AccountWrapperBox, SideBar } from "../../components";

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
});
const Accounts = () => {
  const classes = useStyles();
  const history = useHistory();
  const [close, setClose] = useState(true);
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});
  let cookieData = document.cookie;
  useEffect(() => {
    const tokenData = JSON.parse(cookieData);
    setRole(tokenData.role);
    if (tokenData.role !== "admin" && tokenData.role !== "manager") {
      history.push("/oops");
    }
  });
  useEffect(() => {
    const tokenData = JSON.parse(cookieData);
    setUser({
      name: tokenData.name,
      email: tokenData.email,
    });
  }, []);

  const handleClick = () => {
    setClose(!close);
  };

  return (
    <div>
      {role === "admin" || role === "manager" ? (
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

            <Grid item xs={12} sm={12} md={12} lg={12} className={classes.main}>
              <AccountWrapperBox user={user}></AccountWrapperBox>
            </Grid>
          </Grid>
        </div>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </div>
  );
};

export default Accounts;
