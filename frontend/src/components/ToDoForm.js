import React from "react";
import { Navigate } from "react-router-dom";

class ToDoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.projects[0].id,
      description: "",
      user: this.props.users[0].id,
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleListChange(event) {
    this.setState({
      [event.target.name]: event.target.selectedOptions[0].value,
    });
  }

  handleSubmit(event) {
    this.props.createToDo(
      this.state.project,
      this.state.description,
      this.state.user
    );
    event.preventDefault();
  }

  ToDoForm() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={this.state.description}
            onChange={(event) => this.handleChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="user">user</label>
          <select
            required
            name="user"
            className="form-control"
            onChange={(event) => this.handleListChange(event)}
          >
            {this.props.users.map((item) => (
              <option value={item.id}>{item.username}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="project">project</label>
          <select
            required
            name="project"
            className="form-control"
            onChange={(event) => this.handleListChange(event)}
          >
            {this.props.projects.map((item) => (
              <option value={item.id}>{item.name}</option>
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
      return this.ToDoForm();
    }
    return <Navigate to="/login" replace={true} />;
  }
}

export default ToDoForm;
