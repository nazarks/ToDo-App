import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";
import LoginForm from "./components/Auth";
import Footer from "./components/Footer";
import MainMenu from "./components/MainMenu";
import NotFound404 from "./components/NotFound404";
import ProjectDetail from "./components/ProjectDetail";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";
import UserList from "./components/UserList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      todo: [],
      token: "",
      username: "",
    };
  }

  setToken(token, username) {
    const cookies = new Cookies();

    cookies.set("token", token, { maxAge: 3600 });
    cookies.set("username", username, { maxAge: 3600 });

    this.setState({ token: token, username: username }, () => this.loadData());
  }

  isAuth() {
    return this.state.token !== "";
  }

  logout() {
    this.setToken("", "");
  }

  getTokenFromStorage() {
    const cookies = new Cookies();
    let token = cookies.get("token");
    let username = cookies.get("username");
    if (token === undefined) {
      token = "";
      username = "";
    }
    this.setState({ token: token, username: username }, () => this.loadData());
  }

  getToken(username, password) {
    axios
      .post("http://127.0.0.1:8000/api-token-auth/", {
        username: username,
        password: password,
      })
      .then((response) => {
        this.setToken(response.data["token"], username);
      })
      .catch((error) => alert("Неверный логин или пароль"));
  }

  getHeaders() {
    let headers = {
      "Content-Type": "application/json",
    };
    if (this.isAuth()) {
      headers["Authorization"] = "Token " + this.state.token;
    }
    return headers;
  }

  loadData() {
    const headers = this.getHeaders();
    axios
      .get("http://127.0.0.1:8000/users/", { headers })
      .then((response) => {
        // const users = ;
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ users: [] });
      });

    axios
      .get("http://127.0.0.1:8000/projects/", { headers })
      .then((response) => {
        const projects = response.data;
        this.setState({
          projects: projects,
        });
      })
      .catch((error) => console.error(error));
    axios
      .get("http://127.0.0.1:8000/ToDos/", { headers })
      .then((response) => {
        const todo = response.data;
        this.setState({
          todo: todo,
        });
      })
      .catch((error) => console.error(error));
  }

  deleteProject(id) {
    const headers = this.getHeaders();
    axios
      .delete(`http://127.0.0.01:8000/projects/${id}`, { headers })
      .then((response) => {
        this.loadData();
      })
      .catch((error) => console.log(error));
  }

  createProject(name, url, users) {
    const headers = this.getHeaders();
    const data = { name: name, url: url, users: users };
    axios
      .post(`http://127.0.0.1:8000/projects/`, data, { headers })
      .then((response) => {
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteToDo(id) {
    const headers = this.getHeaders();
    axios
      .delete(`http://127.0.0.01:8000/ToDos/${id}`, { headers })
      .then((response) => {
        this.loadData();
      })
      .catch((error) => console.log(error));
  }

  createToDo(project, description, user) {
    const headers = this.getHeaders();
    const data = {
      project: project,
      description: description,
      user: user,
      isActive: true,
    };
    axios
      .post(`http://127.0.0.1:8000/ToDos/`, data, { headers })
      .then((response) => {
        this.loadData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getTokenFromStorage();
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <BrowserRouter>
              <MainMenu
                isAuth={() => this.isAuth()}
                logout={() => this.logout()}
                username={this.state.username}
              />
              <Routes>
                <Route path="/" element={<Navigate to="/todos" />} />
                <Route
                  path="/users"
                  element={<UserList users={this.state.users} />}
                />

                <Route path="/projects">
                  <Route
                    path="/projects/create"
                    element={
                      <ProjectForm
                        isAuth={() => this.isAuth()}
                        users={this.state.users}
                        createProject={(name, url, users) =>
                          this.createProject(name, url, users)
                        }
                      />
                    }
                  />
                  <Route
                    index
                    element={
                      <ProjectList
                        items={this.state.projects}
                        deleteProject={(id) => this.deleteProject(id)}
                      />
                    }
                  />

                  <Route
                    path=":projectId"
                    element={
                      <ProjectDetail
                        items={this.state.projects}
                        users={this.state.users}
                      />
                    }
                  />
                </Route>

                <Route
                  path="/todos"
                  element={
                    <ToDoList
                      items={this.state.todo}
                      deleteToDo={(id) => this.deleteToDo(id)}
                    />
                  }
                />
                <Route
                  path="/todos/create"
                  element={
                    <ToDoForm
                      isAuth={() => this.isAuth()}
                      users={this.state.users}
                      projects={this.state.projects}
                      createToDo={(project, description, user) =>
                        this.createToDo(project, description, user)
                      }
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <LoginForm
                      getToken={(username, password) =>
                        this.getToken(username, password)
                      }
                      isAuth={() => this.isAuth()}
                    />
                  }
                />

                <Route path="*" element={<NotFound404 />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
