import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = () => {
  const padding = {
    padding: '5px',
    color: '#ededf5',
    textDecoration: 'none',
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              Home
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/create" style={padding}>
              Create new
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users" style={padding}>
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/login" style={padding}>
              Login
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
