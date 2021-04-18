import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});
const FilesTable = () => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setFiles([
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
      {
        date: "10/04/2021",
        uploads: ["file1.doc", "file2.png"],
        comments: ["okay"],
      },
    ]);
  }, []);

  return (
    <div>
      <TableContainer className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Files</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((files, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{files.date}</TableCell>
                  <TableCell>
                    {files.uploads.map((upload) => {
                      return <Typography>{upload}</Typography>;
                    })}
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

export default FilesTable;
