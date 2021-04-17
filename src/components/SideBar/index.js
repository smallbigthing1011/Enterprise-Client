import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
function SideBar(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (props.rolebase === "admin") {
      setList(["Accounts", "Magazines"]);
    }
  }, [props.rolebase]);

  return (
    <div className={classes.root}>
      <Typography
        className={classes.role}
        variant="h6"
      >{`Role - ${props.rolebase}`}</Typography>
      <List className={classes.item}>
        {list.length > 0 ? (
          list.map((text, index) => (
            <Link
              to={`/admin/${text.toLowerCase()}`}
              className={classes.link}
              key={index}
            >
              <ListItem button>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))
        ) : (
          <CircularProgress />
        )}
      </List>
      <List className={classes.item}>
        <ListItem button>
          <ListItemText primary="Logout"></ListItemText>
        </ListItem>
      </List>
    </div>
  );
}

export default SideBar;
