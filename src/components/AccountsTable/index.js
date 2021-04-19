import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const AccountsTable = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let cookieData = document.cookie;
      const tokenData = JSON.parse(cookieData);
      const accountsData = await (
        await fetch("http://localhost:3001/accounts", {
          headers: {
            "Content-type": "application/json",
            "x-access-token": tokenData.token,
          },
          method: "GET",
        })
      ).json();
      setAccounts(accountsData.accounts);
    };
    fetchData();
  }, []);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Faculty</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.length > 0
              ? accounts.map((account) => {
                  if (account.email === "group4.greenwich@gmail.com") {
                    return (
                      <TableRow key={account.id}>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>{account.role}</TableCell>
                        <TableCell>{account.faculty}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    );
                  }
                  return (
                    <TableRow key={account.id}>
                      <TableCell>{account.email}</TableCell>
                      <TableCell>{account.role}</TableCell>
                      <TableCell>{account.faculty}</TableCell>
                      <TableCell>
                        <Link to={`/account/viewAccount/${account.id}`}>
                          <Button>
                            <VisibilityIcon></VisibilityIcon>
                          </Button>
                        </Link>
                        <Link to={`/account/editAccount/${account.id}`}>
                          <Button>
                            <EditIcon></EditIcon>
                          </Button>
                        </Link>
                        <Link to={`/account/deleteAccount/${account.id}`}>
                          <Button>
                            <DeleteIcon></DeleteIcon>
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              : "There is no account yet!"}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AccountsTable;
