import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBarAdmin({ user, setUser }) {
  const dispatch = useDispatch();
  function handleLogoutClick() {
    dispatch(logoutUser());
    setUser(null);
  }
  //   console.log(user.user_balance);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src="https://res.cloudinary.com/dgncyyv7n/image/upload/v1664910953/savings_logo_mngcao.jpg" style={{ width: "80px", height: "80px", padding: "10px" }} />
          </Navbar.Brand>
          <Navbar.Brand>{user.username}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link as={Link} to="/manage_store">
                Manage store
              </Nav.Link>
              <Nav.Link as={Link} to="/manage_user">
                Manage user
              </Nav.Link>

              <Nav.Link href="#" disabled>
                Balance: ${user.user_balance ? user.user_balance : 0}
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Button variant="outline-danger" as={Link} to="/" onClick={handleLogoutClick}>
                Sign out
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* {user.username}
      <Link to="/"> ${user.user_balance ? user.user_balance : 0}</Link>

      <Button as={Link} to="/manage_store">
        Manage store
      </Button>
      <Button as={Link} to="/manage_user">
        Manage user
      </Button>
      <Button variant="outline" as={Link} to="/" onClick={handleLogoutClick}>
        Logout
      </Button> */}
    </>
  );
}

export default NavBarAdmin;
