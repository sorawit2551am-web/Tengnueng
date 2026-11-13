
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '../../../../lib/db.js';

// ฟังก์ชันตรวจสอบ JSON
async function getBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

// GET: แสดงข้อมูลผู้ใช้ทั้งหมด
export async function GET() {
  try {
    const [rows] = await db.query(
      'SELECT id, username FROM tbl_users ORDER BY id DESC'
    );

    return NextResponse.json({
      status: 'ok',
      total: rows.length,
      data: rows
    }, { status: 200 });

  } catch (err) {
    console.error('GET Error:', err);

    return NextResponse.json({
      status: 'error',
      message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้'
    }, { status: 500 });
  }
}

// POST: เพิ่มผู้ใช้ใหม่
export async function POST(request) {
  try {
    const body = await getBody(request);

    if (!body) {
      return NextResponse.json({
        message: 'รูปแบบ JSON ไม่ถูกต้อง'
      }, { status: 400 });
    }

    const username = body.username?.trim();
    const password = body.password;

    if (!username || !password) {
      return NextResponse.json({
        message: 'กรุณากรอก username และ password'
      }, { status: 400 });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO tbl_users (username, password)
       VALUES (?, ?)`,
      [username, hashedPassword]
    );

    return NextResponse.json({
      status: 'ok',
      message: 'เพิ่มผู้ใช้สำเร็จ',
      id: result.insertId
    }, { status: 201 });

  } catch (err) {
    console.error('POST Error:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({
        message: 'Username นี้มีอยู่ในระบบแล้ว'
      }, { status: 409 });
    }

    return NextResponse.json({
      status: 'error',
      message: 'ไม่สามารถเพิ่มผู้ใช้ได้'
    }, { status: 500 });
  }
}

// PUT: แก้ไขข้อมูลผู้ใช้
export async function PUT(request) {
  try {
    const body = await getBody(request);

    if (!body) {
      return NextResponse.json({
        message: 'รูปแบบ JSON ไม่ถูกต้อง'
      }, { status: 400 });
    }

    const { id, password } = body;
    const username = body.username?.trim();

    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
      return NextResponse.json({
        message: 'กรุณาระบุ id ให้ถูกต้อง'
      }, { status: 400 });
    }

    if (!username) {
      return NextResponse.json({
        message: 'กรุณาระบุ username'
      }, { status: 400 });
    }

    let sql;
    let values;

    // ถ้าต้องการเปลี่ยนรหัสผ่านด้วย
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      sql = `UPDATE tbl_users
             SET username = ?, password = ?
             WHERE id = ?`;

      values = [username, hashedPassword, Number(id)];

    } else {
      // แก้ไขเฉพาะ username
      sql = `UPDATE tbl_users
             SET username = ?
             WHERE id = ?`;

      values = [username, Number(id)];
    }

    await db.query(sql, values);

    // ตรวจสอบว่ามีผู้ใช้อยู่จริงหรือไม่
    const [users] = await db.query(
      'SELECT id FROM tbl_users WHERE id = ?',
      [Number(id)]
    );

    if (users.length === 0) {
      return NextResponse.json({
        message: 'ไม่พบผู้ใช้ที่ต้องการแก้ไข'
      }, { status: 404 });
    }

    return NextResponse.json({
      status: 'ok',
      message: 'แก้ไขข้อมูลผู้ใช้สำเร็จ'
    }, { status: 200 });

  } catch (err) {
    console.error('PUT Error:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({
        message: 'Username นี้มีอยู่ในระบบแล้ว'
      }, { status: 409 });
    }

    return NextResponse.json({
      status: 'error',
      message: 'ไม่สามารถแก้ไขข้อมูลผู้ใช้ได้'
    }, { status: 500 });
  }
}
