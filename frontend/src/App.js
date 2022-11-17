import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import MainMenu from "./components/MainMenu";
import NotFound404 from "./components/NotFound404";
import ProjectDetail from "./components/ProjectDetail";
import ProjectList from "./components/ProjectList";
import ToDoList from "./components/ToDoList_";
import UserList from "./components/UserList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      todo: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/users/")
      .then((response) => {
        const users = response.data;
        this.setState({
          users: users,
        });
      })
      .catch((error) => console.error(error));
    axios
      .get("http://127.0.0.1:8000/projects/")
      .then((response) => {
        const projects = response.data;
        this.setState({
          projects: projects,
        });
      })
      .catch((error) => console.error(error));
    axios
      .get("http://127.0.0.1:8000/ToDos/")
      .then((response) => {
        const todo = response.data;
        this.setState({
          todo: todo,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <BrowserRouter>
              <MainMenu />
              <Routes>
                <Route path="/" element={<Navigate to="/todos" />} />
                <Route
                  path="/users"
                  element={<UserList users={this.state.users} />}
                />

                <Route path="/projects">
                  <Route
                    index
                    element={<ProjectList items={this.state.projects} />}
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
                  element={<ToDoList items={this.state.todo} />}
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
