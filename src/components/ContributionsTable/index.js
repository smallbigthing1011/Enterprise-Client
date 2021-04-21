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

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

const ContributionsTable = (props) => {
  const classes = useStyles();
  const [contributions, setContributions] = useState([]);
  const [accId, setAccId] = useState("");

  const [faculty, setFaculty] = useState("");
  let cookieData = document.cookie;
  useEffect(() => {
    const fetchData = async () => {
      const tokenData = JSON.parse(cookieData);

      const accountData = await (
        await fetch(`http://localhost:3001/accounts/me`, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "GET",
        })
      ).json();
      if (accountData.exitcode === 0) {
        setFaculty(accountData.account.faculty);
        setAccId(accountData.account.id);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(faculty);
    const tokenData = JSON.parse(cookieData);

    const fetchData = async () => {
      if (tokenData.role === "coordinator") {
        const contributionsData = await (
          await fetch(
            `http://localhost:3001/contributions/faculty/${faculty}`,
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
      } else if (tokenData.role === "student") {
        const contributionsData = await (
          await fetch(`http://localhost:3001/contributions/account`, {
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
          await fetch("http://localhost:3001/contributions", {
            headers: {
              "Content-type": "application/json",
              "x-access-token": tokenData.token,
            },
            method: "GET",
          })
        ).json();
        const selectedCon = contributionsData.contributions.filter(
          (item) => item.isSelected === true
        );
        setContributions(selectedCon);
        console.log(contributionsData);
      }
    };
    fetchData();
  }, []);
  const handleChange = (id, event) => {
    let contriIndex = contributions.findIndex((ele) => {
      return ele.title === id;
    });
    let updatedContri = contributions[contriIndex];
    updatedContri.isSelected = event.target.checked;
    setContributions([
      ...contributions.slice(0, contriIndex),
      updatedContri,
      ...contributions.slice(contriIndex + 1),
    ]);
    console.log(contriIndex, updatedContri.isSelected);
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
                              handleChange(item.title, event);
                            }}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </TableCell>
                      ) : (
                        ""
                      )}
                      <TableCell>
                        <Link
                          to={`/contribution/${item.id}`}
                          className={classes.link}
                        >
                          <Button>
                            <VisibilityIcon></VisibilityIcon>
                          </Button>
                        </Link>
                        <Link
                          to={`/update/${item.id}`}
                          className={classes.link}
                        >
                          <Button>
                            <EditIcon></EditIcon>
                          </Button>
                        </Link>
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
