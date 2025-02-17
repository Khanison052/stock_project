import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

function App() {
  return (
    <Router>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h2>Welcome to Inventory System</h2>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:codeproduct" element={<EditProduct />} /> {/* ต้องมี :codeproduct */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
