import Head from "next/head";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
export default function Header({ isLoggedIn }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">NextJs Auth</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!isLoggedIn ? (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          ) : null}
          {isLoggedIn ? <Nav.Link href="/logout">Logout</Nav.Link> : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
