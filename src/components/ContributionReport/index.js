import {
  Box,
  Button,
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_ENDPOINT from "../../endpoint";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

const ContributionReport = (props) => {
  const classes = useStyles();
  const [contributions, setContributions] = useState([]);
  const [o14contributions, seto14Contributions] = useState([]);

  let cookieData = document.cookie;
  const tokenData = JSON.parse(cookieData);
  useEffect(() => {
    const fetchData = async () => {
      const contributionsData = await (
        await fetch(
          `${API_ENDPOINT}/report/exception/contributionWithoutComment`,
          {
            headers: {
              "Content-type": "application/json",
              "x-access-token": tokenData.token,
            },
            method: "GET",
          }
        )
      ).json();
      const contributionso14Data = await (
        await fetch(
          `${API_ENDPOINT}/report/exception/contributionWithoutComment/over14/${props.year}`,
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
      seto14Contributions(contributionso14Data.contributions);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Box margin={3}>
        <Typography variant="h5" align="center">
          Contributions without comments
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contributors</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Select</TableCell>
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

                        <TableCell>
                          <Checkbox
                            checked={item.isSelected}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </TableCell>

                        <TableCell>
                          <Link to={`/contribution/${item.id}/${props.state}`}>
                            <Button>
                              <VisibilityIcon></VisibilityIcon>
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
      </Box>
      <Box margin={3}>
        <Typography variant="h5" align="center">
          Contributions without comments after 14 days
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contributors</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Select</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {o14contributions.length > 0
                ? o14contributions.map((item) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.contributorName}</TableCell>
                        <TableCell>{item.title}</TableCell>

                        <TableCell>
                          <Checkbox
                            checked={item.isSelected}
                            inputProps={{ "aria-label": "primary checkbox" }}
                          />
                        </TableCell>

                        <TableCell>
                          <Link to={`/contribution/${item.id}/${props.state}`}>
                            <Button>
                              <VisibilityIcon></VisibilityIcon>
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
      </Box>
    </div>
  );
};

export default ContributionReport;
