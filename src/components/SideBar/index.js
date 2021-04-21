import {
  Box,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  item: {
    width: "100%",
  },
  button: {
    color: "white",
  },
  role: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    marginTop: "40px",
    paddingLeft: "20px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));
function SideBar() {
  const classes = useStyles();
  const history = useHistory();

  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  let cookieData = document.cookie;
  useEffect(() => {
    const tokenData = JSON.parse(cookieData);
    setRole(tokenData.role);
    setId(tokenData.id);
  }, []);

  const handleClickLogout = () => {
    document.cookie = `${cookieData}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.role} variant="h6"></Typography>
      <List className={classes.item}>
        {role === "admin" && (
          <Box>
            <Link to="/dashboard" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link to="/accounts" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Accounts" />
              </ListItem>
            </Link>
            <Link to="/magazines" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Magazines" />
              </ListItem>
            </Link>
          </Box>
        )}
        {role === "manager" && (
          <Box>
            <Link to="/dashboard" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link to="/accounts" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Accounts" />
              </ListItem>
            </Link>
            <Link to="/magazines" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Magazines" />
              </ListItem>
            </Link>
          </Box>
        )}
        {role === "coordinator" && (
          <Box>
            <Link to={`/account/editAccount/${id}`} className={classes.link}>
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
            <Link to="/magazines" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Magazines" />
              </ListItem>
            </Link>
          </Box>
        )}
        {role === "student" && (
          <Box>
            <Link to={`/account/editAccount/${id}`} className={classes.link}>
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
            <Link to="/magazines" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Magazines" />
              </ListItem>
            </Link>
          </Box>
        )}
        {role === "guest" && (
          <Box>
            <Link to={`/account/editAccount/${id}`} className={classes.link}>
              <ListItem button>
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>
            <Link to="/magazines" className={classes.link}>
              <ListItem button>
                <ListItemText primary="Magazines" />
              </ListItem>
            </Link>
          </Box>
        )}
      </List>
      <List className={classes.item}>
        <ListItem button>
          <ListItemText
            primary="Logout"
            onClick={handleClickLogout}
          ></ListItemText>
        </ListItem>
      </List>
    </div>
  );
}

export default SideBar;
