import React from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProjectDetail = ({ items, users }) => {
  let { projectId } = useParams();
  const filterProjects = items.find((item) => item.id === parseInt(projectId));
  const filterUsers = [];

  filterProjects.users.forEach((userId) => {
    const projectUser = users.find((user) => user.id === userId);
    filterUsers.push(
      `${projectUser.username}: (${projectUser.firstName} ${projectUser.lastName})`
    );
  });

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
        <tr>
          <td>{filterProjects.name}</td>
          <td>{filterProjects.url}</td>
          <td>{filterUsers.join(", ")}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ProjectDetail;
