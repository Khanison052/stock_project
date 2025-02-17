import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // เพิ่ม Link

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Product List</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : error ? (
        <Alert variant="danger">
          Error loading products: {error.message}
        </Alert>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Date</th>
              <th>Piece</th>
              <th>Actions</th> {/* เพิ่ม Actions */}
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.codeproduct}>
                <td>{product.codeproduct}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.date}</td>
                <td>{product.piece}</td>
                <td>
                  {/* เพิ่มปุ่ม Edit */}
                  <Link to={`/edit-product/${product.codeproduct}`}>
                    <Button variant="warning" size="sm">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ProductList;
