import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import brand from "../../imgs/brand.webp";
import classes from "./BootstrapNavbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../store/cart-context";

const BootstrapNavbar = ({ onLogout, onOpenCart }) => {
  const cartCtx = useContext(CartContext);

  return (
    <Navbar
      className={classes.navbar}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={brand}
            style={{ height: 70, width: 214 }}
            alt="Logo of Lily's Cuisine"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className={classes.nav}>
            <Nav.Link href="#menu">Menu</Nav.Link>
            <Nav.Link href="#meals">Meals</Nav.Link>
            <Nav.Link href="#search">Search</Nav.Link>

            <Nav.Link
              className={classes.cart}
              onClick={onOpenCart}
              eventKey={2}
              href="#cart"
            >
              {cartCtx.totalDishes.length} items{" "}
              <FontAwesomeIcon icon={faCartShopping} />
            </Nav.Link>
            <NavDropdown title="User" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i> Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BootstrapNavbar;
