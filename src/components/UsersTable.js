import React from "react";
import { useSelector } from "react-redux";
import { deleteUser, getAllUsersCount, getUsers } from "../services/UsersAPI";
import { Button } from "@mui/material";

export const UsersTable = ({ addUserCallback }) => {
  const users = useSelector((state) => state.users);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const fetchUsers = async (page) => {
    try {
      await Promise.all([getUsers({ page }), getAllUsersCount()]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchUsers(page);
  }, [page]);
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  };
  const headers = ["Name", "Last Name", "Credit Card", "Action"];
  return isLoading ? null : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
        justifyContent: "initial",
        height: "100%",
      }}
    >
      <table data-testid="users-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                style={{
                  padding: "4px",
                  border: "1px solid black",
                  backgroundColor: "lightgray",
                }}
                key={header}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.list.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.last_name}</td>
              <td>{user.credit_card}</td>
              <td>
                <Button
                  style={{
                    backgroundColor: "lightsalmon",
                    padding: "0.4rem",
                    color: 'black'
                  }}
                  onClick={() => handleDelete(user.id)}
                >
                  <span>Delete</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.totalUsers > users.totalLimit && (
        <Button
          onClick={() => setPage(page + 1)}
          style={{
            backgroundColor: "azure",
            border: "1px solid black",
            padding: "0.1rem 0.2rem",
            color: 'black'
          }}
        >
          Load more
        </Button>
      )}
      <Button
        style={{
          marginTop: "20px",
          marginLeft: "auto",
          backgroundColor: "royalblue",
          padding: "0.5rem",
          color: "white",
        }}
        type="button"
        onClick={addUserCallback}
      >
        Add User
      </Button>
    </div>
  );
};
