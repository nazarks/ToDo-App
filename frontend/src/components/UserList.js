import React from "react";
import { Table } from "react-bootstrap";

const UserItem = ({ user }) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
    </tr>
  );
};

const UserList = ({ users }) => {
  return (
    <Table striped hover size="lg">
      <thead>
        <tr>
          <th>User name</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <UserItem user={user} />
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;
