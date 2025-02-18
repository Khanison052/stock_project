import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container } from 'react-bootstrap';

function LoginAdmin({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'password123') { // เปลี่ยนรหัสให้ตรงกับระบบ
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/products'); // ล็อกอินแล้วไปหน้า ProductList
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Admin Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Login</Button>
      </Form>
    </Container>
  );
}

export default LoginAdmin;
