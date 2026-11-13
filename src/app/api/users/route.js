
import { NextResponse } from 'next/server';
import db from '../../lib/db.js';

// GET: ดูข้อมูลผู้ใช้ทั้งหมด
export async function GET() {
  try {
    // ตรวจสอบ Database
    console.log('DB object:', typeof db);
    console.log('DB query:', typeof db.query);

    const [rows] = await db.query(
      'SELECT id, username FROM tbl_users'
    );

    return NextResponse.json({
      status: 'ok',
      total: rows.length,
      data: rows,
    }, { status: 200 });

  } catch (err) {
    console.error('GET Error:', err);

    return NextResponse.json(
      { status: 'error', error: err.message },
      { status: 500 }
    );
  }
}

// POST: เพิ่มผู้ใช้
export async function POST(request) {
  try {
    const body = await request.json();

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'กรุณากรอก username และ password' },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      'INSERT INTO tbl_users (username, password) VALUES (?, ?)',
      [username.trim(), password]
    );

    return NextResponse.json({
      status: 'ok',
      message: 'เพิ่มผู้ใช้สำเร็จ',
      id: result.insertId,
    }, { status: 201 });

  } catch (err) {
    console.error('POST Error:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'Username นี้มีอยู่แล้ว' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { status: 'error', error: err.message },
      { status: 500 }
    );
  }
}

// PUT: แก้ไขข้อมูลผู้ใช้
export async function PUT(request) {
  try {
    const body = await request.json();

    const { id, username, password } = body;

    if (!id || !Number.isInteger(Number(id)) ||
        Number(id) <= 0 || !username?.trim()) {
      return NextResponse.json(
        { error: 'กรุณาระบุ id และ username ให้ถูกต้อง' },
        { status: 400 }
      );
    }

    let result;

    if (password) {
      [result] = await db.query(
        `UPDATE tbl_users
         SET username = ?, password = ?
         WHERE id = ?`,
        [username.trim(), password, Number(id)]
      );
    } else {
      [result] = await db.query(
        `UPDATE tbl_users
         SET username = ?
         WHERE id = ?`,
        [username.trim(), Number(id)]
      );
    }

    if (result.affectedRows === 0) {
      const [rows] = await db.query(
        'SELECT id FROM tbl_users WHERE id = ?',
        [Number(id)]
      );

      if (rows.length === 0) {
        return NextResponse.json(
          { error: 'ไม่พบผู้ใช้ที่ต้องการแก้ไข' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({
      status: 'ok',
      message: 'แก้ไขข้อมูลผู้ใช้สำเร็จ',
    }, { status: 200 });

  } catch (err) {
    console.error('PUT Error:', err);

    return NextResponse.json(
      { status: 'error', error: err.message },
      { status: 500 }
    );
  }
}
