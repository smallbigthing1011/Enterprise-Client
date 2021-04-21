import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

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
                    <a href={`http://localhost:3001/files/${file.id}`}>
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
