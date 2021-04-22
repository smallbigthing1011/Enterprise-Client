import {
  Button,
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_ENDPOINT from "../../endpoint";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

const ContributionsTable = (props) => {
  const classes = useStyles();
  const [contributions, setContributions] = useState([]);

  let cookieData = document.cookie;
  const tokenData = JSON.parse(cookieData);
  useEffect(() => {
    const fetchData = async () => {
      if (tokenData.role === "coordinator") {
        const contributionsData = await (
          await fetch(
            `${API_ENDPOINT}/contributions/faculty/${tokenData.faculty}`,
            {
              headers: {
                "Content-type": "application/json",
                "x-access-token": tokenData.token,
              },
              method: "GET",
            }
          )
        ).json();
        setContributions(contributionsData.contribution);
      } else if (tokenData.role === "student") {
        const contributionsData = await (
          await fetch(`${API_ENDPOINT}/contributions/account`, {
            headers: {
              "Content-type": "application/json",
              "x-access-token": tokenData.token,
            },
            method: "GET",
          })
        ).json();
        setContributions(contributionsData.contributions);
      } else if (tokenData.role === "manager" || tokenData.role === "admin") {
        const contributionsData = await (
          await fetch(`${API_ENDPOINT}/contributions/selected`, {
            headers: {
              "Content-type": "application/json",
              "x-access-token": tokenData.token,
            },
            method: "GET",
          })
        ).json();
        setContributions(contributionsData.contributions);
      } else if (tokenData.role === "guest") {
        const contributionsData = await (
          await fetch(
            `${API_ENDPOINT}/contributions/faculty/${tokenData.faculty}/selected`,
            {
              headers: {
                "Content-type": "application/json",
                "x-access-token": tokenData.token,
              },
              method: "GET",
            }
          )
        ).json();
        setContributions(contributionsData.contributions);
      }
    };
    fetchData();
  }, []);
  const handleChange = async (id, event) => {
    let contriIndex = contributions.findIndex((ele) => {
      return ele.id === id;
    });

    if (event.target.checked === true) {
      const contributionSelected = await (
        await fetch(`${API_ENDPOINT}/contributions/${id}/select`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "PUT",
        })
      ).json();
      setContributions([
        ...contributions.slice(0, contriIndex),
        contributionSelected.contribution,
        ...contributions.slice(contriIndex + 1),
      ]);
    } else {
      const contributionSelected = await (
        await fetch(`${API_ENDPOINT}/contributions/${id}/deselect`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "PUT",
        })
      ).json();
      setContributions([
        ...contributions.slice(0, contriIndex),
        contributionSelected.contribution,
        ...contributions.slice(contriIndex + 1),
      ]);
    }
  };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {props.role !== "student" ? "Contributors" : "Student Name"}
              </TableCell>
              <TableCell>Title</TableCell>
              {props.role !== "student" ? <TableCell>Select</TableCell> : ""}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contributions.length > 0
              ? contributions.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.contributorName}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      {props.role !== "student" ? (
                        <TableCell>
                          <Checkbox
                            checked={item.isSelected}
                            onChange={(event) => {
                              if (props.role === "coordinator") {
                                handleChange(item.id, event);
                              }
                            }}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </TableCell>
                      ) : (
                        ""
                      )}
                      <TableCell>
                        <Link
                          to={`/contribution/${item.id}/${props.state}`}
                          className={classes.link}
                        >
                          <Button>
                            <VisibilityIcon></VisibilityIcon>
                          </Button>
                        </Link>
                        {props.role == "student" && (
                          <Link
                            to={`/update/${item.id}`}
                            className={classes.link}
                          >
                            <Button>
                              <EditIcon></EditIcon>
                            </Button>
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              : "No contributions"}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContributionsTable;
