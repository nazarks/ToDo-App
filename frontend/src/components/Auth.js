import React from "react";
import { Navigate } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "", password: "" };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    this.props.getToken(this.state.login, this.state.password);
    event.preventDefault();
  }

  loginForm() {
    return (
      <div className="Auth-form-container">
        <form
          className="Auth-form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Login</label>
              <input
                type="text"
                name="login"
                value={this.state.login}
                onChange={(event) => this.handleChange(event)}
                className="form-control mt-1"
                placeholder="Enter login"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={(event) => this.handleChange(event)}
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="##">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
  render() {
    if (this.props.isAuth()) {
      return <Navigate to="/" replace={true} />;
    }
    return this.loginForm();
  }
}

export default LoginForm;
