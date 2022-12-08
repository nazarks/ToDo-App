import React from "react";
import { Button, Table } from "react-bootstrap";

const getLocalDateTime = (dateTime) => {
  const utcDateTime = new Date(dateTime);
  return utcDateTime.toLocaleString();
};

const ToDoItem = ({ item, deleteToDo }) => {
  return (
    <tr>
      <td>{item.project}</td>
      <td>{item.description}</td>
      <td>{item.user}</td>
      <td>{getLocalDateTime(item.created)}</td>
      <td>
        <Button variant="danger" size="sm" onClick={() => deleteToDo(item.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

const ToDoList = ({ items, deleteToDo }) => {
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
          <ToDoItem item={item} deleteToDo={deleteToDo} />
        ))}
      </tbody>
    </Table>
  );
};

export default ToDoList;
