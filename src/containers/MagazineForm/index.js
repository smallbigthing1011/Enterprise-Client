import {
  Box,
  Button,
  createMuiTheme,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import crypto from "crypto-random-string";
import React, { useEffect, useState } from "react";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleSelected, setRoleSelected] = useState("");
  const [faculty, setFaculty] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  useEffect(async () => {
    if (action !== "createMagazine") {
      let cookieData = document.cookie;
      const tokenData = JSON.parse(cookieData);
      const account = await (
        await fetch(`http://localhost:3001/account/${idaccount}`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "GET",
        })
      ).json();
      if (account.exitcode === 0) {
        setUsername(account.account.username);
        setRoleSelected(account.account.role);
        setEmail(account.account.email);
        setFaculty(account.account.faculty);
        setPhone(account.account.phone);
        setFullname(account.account.fullname);
        setGender(account.account.gender);
        setDob(account.account.dob);
      }
    }
  }, []);

  const handleClick = () => {
    setClose(!close);
  };
  const handleClickGenerate = () => {
    let generated = crypto({ length: 16, type: "ascii-printable" });
    setPassword(generated);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeSelect = (event) => {
    setRoleSelected(event.target.value);
  };
  const handleChangeFaculty = (event) => {
    setFaculty(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeFullname = (event) => {
    setFullname(event.target.value);
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangeDOB = (event) => {
    setDob(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleClickSave = async () => {
    let cookieData = document.cookie;
    const tokenData = JSON.parse(cookieData);
    const newAccount = await (
      await fetch("http://localhost:3001/account", {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          role: roleSelected,
          faculty,
          email,
          phone,
          fullname,
          gender,
          dob,
        }),
      })
    ).json();
    history.push("/accounts");
  };

  const handleClickUpdate = async () => {
    let cookieData = document.cookie;
    const tokenData = JSON.parse(cookieData);
    const updatedAccount = await (
      await fetch(`http://localhost:3001/account/${idaccount}`, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "PUT",
        body: JSON.stringify({
          username,
          password,
          role: roleSelected,
          faculty,
          email,
          phone,
          fullname,
          gender,
          dob,
        }),
      })
    ).json();
    if (updatedAccount.exitcode === 0) {
      if (roleSelected === "admin" || roleSelected === "manager") {
        history.push("/accounts");
      } else {
        history.push("/magazines");
      }
    } else {
      console.log(updatedAccount);
    }
  };
  const handleClickDelete = async () => {
    let cookieData = document.cookie;
    const tokenData = JSON.parse(cookieData);
    const deletedAccount = await (
      await fetch(`http://localhost:3001/account/${idaccount}`, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": tokenData.token,
        },
        method: "DELETE",
      })
    ).json();
    if (deletedAccount.exitcode === 0) {
      history.push("/accounts");
    } else {
      console.log(deletedAccount);
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
          md={3}
          lg={3}
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
          justify="center"
          alignItems="center"
        >
          <Box component={Paper} className={classes.papper} padding={3}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={handleChangeUsername}
            ></TextField>

            {action === "createAccount" && (
              <Box width="100%">
                <Grid item container xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={10} lg={10}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      value={password}
                      onChange={handleChangePassword}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClickGenerate}
                      fullWidth
                      className={classes.btn}
                    >
                      Generate
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}

            <FormControl variant="outlined" fullWidth>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={roleSelected}
                onChange={action === "createAccount" && handleChangeSelect}
                label="Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="coordinator">Coordinator</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="guest">Guest</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleChangeEmail}
            ></TextField>
            <TextField
              label="Faculty"
              variant="outlined"
              fullWidth
              value={faculty}
              onChange={handleChangeFaculty}
            ></TextField>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={fullname}
              onChange={handleChangeFullname}
            ></TextField>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              type="number"
              value={phone}
              onChange={handleChangePhone}
            ></TextField>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                value={gender}
                onChange={handleChangeGender}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="DOB"
              variant="outlined"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={dob}
              onChange={handleChangeDOB}
            ></TextField>
            {action === "createAccount" && (
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

            {action === "editAccount" && (
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
            {action === "deleteAccount" && (
              <ThemeProvider theme={theme}>
                <Box className={classes.btngroup}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClickDelete}
                  >
                    Delete
                  </Button>
                </Box>
              </ThemeProvider>
            )}
            {action === "viewAccount" && ""}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default MagazineForm;
