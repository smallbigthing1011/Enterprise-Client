import {
  Box,
  Button,
  createMuiTheme,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../images/logo-gw.jpg";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ffffff",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E7E7DE",
    height: "100vh",
    width: "100vw",
  },
  paper: {
    width: "20%",
    background: "#0F3057",
  },
  logo: {
    width: "22%",
  },
  logoImg: {
    width: "100%",
    borderRadius: "80px",
    marginBottom: "10px",
  },
  button: {
    background: "#008891",
    color: "white",
  },
  typo: {
    color: "white",
    fontSize: "20px",
  },
  textfield: {
    color: "white",
  },
}));
const Login = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    const token = await (
      await fetch("http://localhost:3001/auth", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      })
    ).json();
    if (token.message) {
      setOpen(true);
      setUsername("");
      setPassword("");
    } else {
      const data = await (
        await fetch("http://localhost:3001/account/me", {
          headers: {
            "Content-type": "application/json",
            "x-access-token": token.token,
          },
          method: "GET",
        })
      ).json();
      let cookieSave = {
        token: token.token,
        role: data.account.role,
      };
      document.cookie = JSON.stringify(cookieSave);
      if (data.account.role === "admin" || data.account.role === "manager") {
        history.push("/accounts");
      } else {
        history.push("/magazines");
      }
    }
  };
  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const classes = useStyles();
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
        message="Invalid username or password"
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
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid
          container
          justify="center"
          alignItems="center"
          item
          md={12}
          direction="column"
        >
          <Box className={classes.logo}>
            <img src={Logo} className={classes.logoImg} alt="logo"></img>
          </Box>
          <Box component={Paper} className={classes.paper} padding={5}>
            <form onKeyDown={handleSubmit}>
              <Grid container alignItems="center" justify="center" spacing={3}>
                <Grid container justify="center" item md={6}>
                  <Typography className={classes.typo} align="center">
                    Login to Magazine
                  </Typography>
                </Grid>
                <ThemeProvider theme={theme}>
                  <Grid container justify="center" item md={12}>
                    <TextField
                      InputProps={{ className: classes.textfield }}
                      id="standard-secondary"
                      label="Username"
                      fullWidth
                      color="secondary"
                      value={username}
                      onChange={handleChangeUsername}
                    ></TextField>
                  </Grid>
                  <Grid container justify="center" item md={12}>
                    <TextField
                      InputProps={{ className: classes.textfield }}
                      id="standard-secondary"
                      label="Password"
                      fullWidth
                      color="secondary"
                      type="password"
                      value={password}
                      onChange={handleChangePassword}
                    ></TextField>
                  </Grid>
                </ThemeProvider>
                <Grid container justify="center" item md={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    className={classes.button}
                    onClick={handleClick}
                    color="primary"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
