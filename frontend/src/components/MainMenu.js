import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"; // replace react-router-dom link with bootstrap LinkContainer

const MainMenu = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="mr-auto"
        // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
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
              <NavDropdown title="Dropdown" id="nav-dropdown">
                <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">
                  Something else here
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              <Button variant="primary" className="me-2 btn-sm">
                Log In
              </Button>
              <Button variant="primary" className="btn-sm">
                Sign Out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainMenu;
