import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const MainMenu = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="mr-auto"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Container>
          <Navbar.Brand href="/"> Todo App </Navbar.Brand>
          <Navbar.Toggle area-aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" activeKey="/">
              <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  Disabled
                </Nav.Link>
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
