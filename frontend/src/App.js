import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Row } from "react-bootstrap";
import "./App.css";
import Footer from "./components/Footer";
import MainMenu from "./components/MainMenu";
import UserList from "./components/UserList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((response) => {
        const users = response.data;
        this.setState({
          users: users,
        });
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <MainMenu />
            <UserList users={this.state.users} />
            <Footer />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
