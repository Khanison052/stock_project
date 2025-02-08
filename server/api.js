const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql2');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

// สร้างการเชื่อมต่อฐานข้อมูล
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'freenix1',
  database: 'product_projectdb',
});

// ใช้ bodyParser เพื่ออ่านข้อมูล JSON จาก request body
app.use(bodyParser());

// API สำหรับดึงข้อมูลทั้งหมดจากตาราง
router.get('/api/products', async (ctx) => {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM products_project');
    ctx.body = rows;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: 'Error fetching products', error: err.message };
  }
});

// API สำหรับเพิ่มข้อมูลใหม่
router.post('/api/products', async (ctx) => {
  const { codeproduct, name, category, price, date, piece } = ctx.request.body;

  // Validation
  if (!codeproduct || !name || !category || !price || !date || !piece) {
    ctx.status = 400;
    ctx.body = { message: 'Missing required fields' };
    return;
  }

  try {
    const result = await pool.promise().query(
      'INSERT INTO products_project (codeproduct, name, category, price, date, piece) VALUES (?, ?, ?, ?, ?, ?)',
      [codeproduct, name, category, price, date, piece]
    );
    ctx.body = { id: result[0].insertId, codeproduct, name, category, price, date, piece };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: 'Error inserting product', error: err.message };
  }
});

// API สำหรับอัพเดตข้อมูล
router.put('/api/products/:id/:codeproduct', async (ctx) => {
  const { id, codeproduct } = ctx.params;
  const { name, category, price, date, piece } = ctx.request.body;

  // Validation
  if (!name || !category || !price || !date || !piece) {
    ctx.status = 400;
    ctx.body = { message: 'Missing required fields' };
    return;
  }

  try {
    await pool.promise().query(
      'UPDATE products_project SET name = ?, category = ?, price = ?, date = ?, piece = ? WHERE id = ? AND codeproduct = ?',
      [name, category, price, date, piece, id, codeproduct]
    );
    ctx.body = { message: 'Product updated successfully' };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: 'Error updating product', error: err.message };
  }
});

// API สำหรับลบข้อมูล
router.delete('/api/products/:id/:codeproduct', async (ctx) => {
  const { id, codeproduct } = ctx.params;
  try {
    await pool.promise().query('DELETE FROM products_project WHERE id = ? AND codeproduct = ?', [id, codeproduct]);
    ctx.body = { message: 'Product deleted successfully' };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: 'Error deleting product', error: err.message };
  }
});

// กำหนด router ให้กับแอพ
app.use(router.routes()).use(router.allowedMethods());

// เริ่มต้นเซิร์ฟเวอร์
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
