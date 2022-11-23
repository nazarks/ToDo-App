import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"; // replace react-router-dom link with bootstrap LinkContainer

class MainMenu extends React.Component {
  userMenu() {
    if (this.props.isAuth()) {
      return (
        <NavDropdown title={this.props.username} id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">
            Something else here
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4" onClick={this.props.logout}>
            Sign Out
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" className="mr-auto">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Todo App</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle area-aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" activeKey="/">
                <Nav.Item>
                  <LinkContainer to="/users">
                    <Nav.Link>Users</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to="/projects">
                    <Nav.Link>Projects</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <LinkContainer to="/todos">
                    <Nav.Link>ToDo</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                {this.userMenu()}
              </Nav>

              <Nav>
                {this.props.isAuth() ? (
                  <Button
                    variant="primary"
                    className="btn-sm"
                    onClick={() => this.props.logout()}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <LinkContainer to="/login">
                    <Button variant="primary" className="btn-sm">
                      Log In
                    </Button>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default MainMenu;
