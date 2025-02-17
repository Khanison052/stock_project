import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';  

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Inventory</Navbar.Brand> 
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>  
          <Nav.Link as={Link} to="/products">Products</Nav.Link>  
          <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>  
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
