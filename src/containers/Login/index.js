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
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../images/logo-gw.jpg";
import API_ENDPOINT from "../../endpoint";

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
    width: "30%",
    background: "#0F3057",
  },
  logo: {
    width: "200px",
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
  text: {
    "& .MuiFormLabel-root": {
      color: "white",
    },
  },
}));
const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    console.log(API_ENDPOINT);
    const token = await (
      await fetch(`${API_ENDPOINT}/auth`, {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      })
    ).json();

    if (token.message) {
      setOpen(true);
      setEmail("");
      setPassword("");
    } else {
      const data = await (
        await fetch(`${API_ENDPOINT}/accounts/me`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": token.token,
            "Access-Control-Allow-Origin": "*",
          },
          method: "GET",
        })
      ).json();

      let cookieSave = {
        token: token.token,
        id: data.account.id,
        role: data.account.role,
        faculty: data.account.faculty,
        fullname: data.account.fullname,
        email: data.account.email,
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
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
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
        message="Invalid Email or Password"
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
          xs={12}
          sm={12}
          md={12}
          lg={12}
          direction="column"
        >
          <Grid item xs={8} sm={8} md={4} lg={4}>
            <img src={Logo} className={classes.logoImg} alt="logo"></img>
          </Grid>
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
                      className={classes.text}
                      id="standard-secondary"
                      label="Email"
                      fullWidth
                      color="secondary"
                      value={email}
                      onChange={handleChangeEmail}
                    ></TextField>
                  </Grid>
                  <Grid container justify="center" item md={12}>
                    <TextField
                      InputProps={{ className: classes.textfield }}
                      className={classes.text}
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
