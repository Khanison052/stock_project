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

  // ถ้าไม่มีการส่ง piece มา ให้ตั้งค่าเป็น 1
  const pieceValue = piece || 1;  // ใช้ piece ถ้ามี, ถ้าไม่มีให้ใช้ 1

  // ตรวจสอบว่ามีรหัสสินค้า (codeproduct) หรือไม่
  if (!codeproduct || !name || !category || !price || !date) {
    ctx.status = 400;
    ctx.body = { message: 'Missing required fields' };
    return;
  }

  try {
    // ตรวจสอบว่า codeproduct นี้มีอยู่ในฐานข้อมูลหรือยัง
    const [existingProduct] = await pool.promise().query(
      'SELECT * FROM products_project WHERE codeproduct = ?',
      [codeproduct]
    );

    if (existingProduct.length > 0) {
      // ถ้ามีสินค้าแล้ว ให้เพิ่ม piece ไป 1 หรืออัปเดตข้อมูลอื่นๆ
      await pool.promise().query(
        'UPDATE products_project SET name = ?, category = ?, price = ?, date = ?, piece = piece + 1 WHERE codeproduct = ?',
        [name, category, price, date, codeproduct]
      );
      ctx.body = { message: 'Product updated successfully', codeproduct, name, category, price, date, piece: pieceValue };
    } else {
      // ถ้าไม่มีสินค้า ให้เพิ่มสินค้าใหม่
      const result = await pool.promise().query(
        'INSERT INTO products_project (codeproduct, name, category, price, date, piece) VALUES (?, ?, ?, ?, ?, ?)',
        [codeproduct, name, category, price, date, pieceValue]
      );
      ctx.body = { id: result[0].insertId, codeproduct, name, category, price, date, piece: pieceValue };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: 'Error inserting or updating product', error: err.message };
  }
});

// API สำหรับอัพเดตข้อมูลโดยใช้เฉพาะ codeproduct
router.put('/api/products/:codeproduct', async (ctx) => {
  const { codeproduct } = ctx.params;
  const { name, category, price, date, piece } = ctx.request.body;

  // Validation
  if (!name || !category || !price || !date || !piece) {
    ctx.status = 400;
    ctx.body = { message: 'Missing required fields' };
    return;
  }

  try {
    // อัพเดตข้อมูลโดยใช้ codeproduct
    const [result] = await pool.promise().query(
      'UPDATE products_project SET name = ?, category = ?, price = ?, date = ?, piece = ? WHERE codeproduct = ?',
      [name, category, price, date, piece, codeproduct]
    );

    if (result.affectedRows === 0) {
      ctx.status = 404;
      ctx.body = { message: 'Product not found' };
    } else {
      ctx.body = { message: 'Product updated successfully' };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { message: 'Error updating product', error: err.message };
  }
});

// API สำหรับลบข้อมูล
router.delete('/api/products/:codeproduct', async (ctx) => {
  const { codeproduct } = ctx.params;
  try {
    await pool.promise().query('DELETE FROM products_project WHERE codeproduct = ?', [codeproduct]);
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
