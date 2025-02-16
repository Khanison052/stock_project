import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // นำเข้า Link จาก react-router-dom

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Inventory</Navbar.Brand>  {/* เปลี่ยน href เป็น to */}
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>  {/* เปลี่ยน href เป็น to */}
          <Nav.Link as={Link} to="/products">Products</Nav.Link>  {/* เปลี่ยน href เป็น to */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
