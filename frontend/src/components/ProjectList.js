import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProjectItem = ({ item }) => {
  return (
    <tr>
      <td>
        <Link to={`/projects/${item.id}`}>{item.name}</Link>
      </td>
      <td>{item.url}</td>
      <td>{item.users.join(", ")}</td>
    </tr>
  );
};

const ProjectList = ({ items }) => {
  return (
    <Table striped hover size="lg">
      <thead>
        <tr>
          <th>Name</th>
          <th>Url</th>
          <th>List users id</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <ProjectItem item={item} />
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectList;
