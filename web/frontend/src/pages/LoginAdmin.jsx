import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div className="card p-5" style={{ width: '800px',maxWidth: '1000px', backgroundColor: 'rgba(11, 11, 11, 0.352)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(228, 218, 237, 0.2)' }}>
        <div className="card-header text-center">
          <h3 className="text-white" style={{ fontSize: '2.5rem' }}>Sign In</h3>
        </div>
        <div className="card-body">
          <Form>
            <div className="form-group mb-4">
              <input type="text" className="form-control form-control-lg" placeholder="username" />
            </div>
            <div className="form-group mb-4">
              <input type="password" className="form-control form-control-lg" placeholder="password" />
            </div>
            <div className="form-check mb-4">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label text-white" htmlFor="rememberMe">Remember Me</label>
            </div>
            <div className="form-group">
              <Button type="submit" className="w-100 btn-lg">Login</Button>
            </div>
          </Form>
        </div>
        <div className="card-footer text-center">
          <div className="d-flex justify-content-center">
            Don't have an account? <a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
