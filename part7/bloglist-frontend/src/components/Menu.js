import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              home
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/create">
              create new
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/login">
              login
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
