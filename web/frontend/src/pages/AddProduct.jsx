import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

function AddProduct() {
  const [formData, setFormData] = useState({
    codeproduct: '', name: '', category: '', price: '', date: '', piece: 1
  });

  const [loading, setLoading] = useState(false); // สำหรับการแสดงสถานะกำลังบันทึก
  const [error, setError] = useState(null); // สำหรับเก็บข้อผิดพลาด
  const [success, setSuccess] = useState(false); // สำหรับแสดงสถานะสำเร็จ

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // เริ่มโหลด
    setError(null);   // ลบข้อผิดพลาดก่อนการส่งใหม่
    setSuccess(false); // รีเซ็ตสถานะสำเร็จ

    try {
      await axios.post('http://localhost:3000/api/products', formData);
      setSuccess(true); // ถ้าส่งสำเร็จ
      setFormData({
        codeproduct: '', name: '', category: '', price: '', date: '', piece: 1
      }); // รีเซ็ตฟอร์ม
    } catch (error) {
      setError('Error adding product. Please try again.'); // แสดงข้อความข้อผิดพลาด
      console.error('Error adding product:', error);
    } finally {
      setLoading(false); // หมดการโหลด
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      {error && <Alert variant="danger">{error}</Alert>} {/* แสดงข้อผิดพลาด */}
      {success && <Alert variant="success">Product added successfully!</Alert>} {/* แสดงสถานะสำเร็จ */}

      <Form.Group>
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          name="codeproduct"
          value={formData.codeproduct}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Piece</Form.Label>
        <Form.Control
          type="number"
          name="piece"
          min="1"
          value={formData.piece}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Add Product'}
      </Button>
    </Form>
  );
}

export default AddProduct;
