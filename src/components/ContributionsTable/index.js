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
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

// import DeleteIcon from "@material-ui/icons/Delete";
const ContributionsTable = () => {
  const classes = useStyles();
  const [contributions, setContributions] = useState([]);
  useEffect(() => {
    setContributions([
      {
        contributors: "Duy",
        title: "contribution title",
        isSelected: true,
      },
    ]);
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
              <TableCell>Contributors</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Select</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contributions.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.contributors}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={item.isSelected}
                      onChange={(event) => {
                        handleChange(item.title, event);
                      }}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/admin/contributions/details/${index}`}
                      className={classes.link}
                    >
                      <Button>
                        <VisibilityIcon></VisibilityIcon>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContributionsTable;
