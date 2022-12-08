import React from "react";
import { Navigate } from "react-router-dom";

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: "",
      users: [],
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleUsersChange(event) {
    if (!event.target.selectedOptions) {
      this.setState({
        users: [],
      });
    }
    let users = [];

    for (let item of event.target.selectedOptions) {
      users.push(item.value);
    }
    this.setState({
      users: users,
    });
  }

  handleSubmit(event) {
    this.props.createProject(this.state.name, this.state.url, this.state.users);
    event.preventDefault();
  }

  projectForm() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={this.state.name}
            onChange={(event) => this.handleChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">url</label>
          <input
            type="url"
            className="form-control"
            name="url"
            value={this.state.url}
            onChange={(event) => this.handleChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="users">users</label>
          <select
            required
            multiple
            name="users"
            className="form-control"
            onChange={(event) => this.handleUsersChange(event)}
          >
            {this.props.users.map((item) => (
              <option value={item.id}>{item.username}</option>
            ))}
          </select>
        </div>
        <br />
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    );
  }
  render() {
    if (this.props.isAuth()) {
      return this.projectForm();
    }
    return <Navigate to="/login" replace={true} />;
  }
}

export default ProjectForm;
