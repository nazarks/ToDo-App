import React from "react";
import { Table } from "react-bootstrap";

const getLocalDateTime = (dateTime) => {
  const utcDateTime = new Date(dateTime);
  return utcDateTime.toLocaleString();
};

const ToDoItem = ({ item }) => {
  return (
    <tr>
      <td>{item.project}</td>
      <td>{item.description}</td>
      <td>{item.user}</td>
      <td>{getLocalDateTime(item.created)}</td>
    </tr>
  );
};

const ToDoList = ({ items }) => {
  return (
    <Table striped hover size="lg">
      <thead>
        <tr>
          <th>Project id</th>
          <th>ToDo</th>
          <th>User id</th>
          <th>Created</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <ToDoItem item={item} />
        ))}
      </tbody>
    </Table>
  );
};

export default ToDoList;
