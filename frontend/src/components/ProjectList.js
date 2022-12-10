import React from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProjectItem = ({ item, deleteProject }) => {
  return (
    <tr>
      <td>
        <Link to={`/projects/${item.id}`}>{item.name}</Link>
      </td>
      <td>{item.url}</td>
      <td>{item.users.join(", ")}</td>
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={() => deleteProject(item.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

const ProjectListComp = ({ items, deleteProject }) => {
  return (
    <Table striped hover size="lg">
      <thead>
        <tr>
          <th>Name</th>
          <th>Url</th>
          <th>List users id</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <ProjectItem item={item} deleteProject={deleteProject} />
        ))}
      </tbody>
    </Table>
  );
};

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filterProjects: this.props.items,
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    const filterProjects = this.props.items.filter((item) =>
      item.name.includes(event.target.value)
    );

    this.setState({
      filterProjects: filterProjects,
    });
  }

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col sm={4}></Col>
            <Col sm={4}>
              <Form.Control
                type="search"
                placeholder="Search Project"
                className="me-2"
                aria-label="Search"
                name="search"
                value={this.state.search}
                onChange={(event) => this.handleChange(event)}
              />
            </Col>
            <Col sm={4}></Col>
          </Row>
        </Container>
        <ProjectListComp
          items={this.state.filterProjects}
          deleteProject={this.props.deleteProject}
        />
      </>
    );
  }
}

export default ProjectList;
