import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"

const CustomNavbar = ({ pageInfo }) => {
  console.log(pageInfo)
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
      <Navbar.Brand href="/">ec2 by az</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" activeKey={pageInfo && pageInfo.pageName}>
          <Nav.Item><Nav.Link href="/global" eventKey="global">Global</Nav.Link></Nav.Item>
          <NavDropdown title="Regions" id="nav-dropdown">
            <Nav.Link href="/us-west-2" eventKey="us-west-2" className="dark-link" style={{color:`black`}}>us-west-2</Nav.Link>
            <Nav.Link href="/us-east-1" eventKey="us-east-1" className="dark-link" style={{color:`black`}}>us-east-1</Nav.Link>
            <Nav.Link href="/eu-west-1" eventKey="eu-west-1" className="dark-link" style={{color:`black`}}>eu-west-1</Nav.Link>
            <NavDropdown.Divider />
          </NavDropdown>
        </Nav>

      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
