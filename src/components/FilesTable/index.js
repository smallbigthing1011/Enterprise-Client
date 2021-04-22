import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import API_ENDPOINT from "../../endpoint";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const FilesTable = (props) => {
  const classes = useStyles();

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
            {props.files.map((file) => {
              return (
                <TableRow key={file.id}>
                  <TableCell>{file.createdAt}</TableCell>
                  <TableCell>
                    <a href={`${API_ENDPOINT}/files/${file.id}`}>
                      {file.filename}
                    </a>
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
