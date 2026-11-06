import { NextResponse } from "next/server";

//================================================================================
// GET Function (ดึงข้อมูลตาม ID)
//================================================================================
export async function GET(request, { params }) {
  try {
    const { id } = await params; // ดึงค่า ID จาก URL (เช่น 22)
    console.log({ success: true, message: `ดึงข้อมูลผู้ใช้ ID: ${id} สำเร็จ`, status: 200 });

    return NextResponse.json(
      {
        success: true,
        message: `ดึงข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
        userId: id,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

//================================================================================
// POST Function (สร้าง/เพิ่มข้อมูล)
//================================================================================
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({})); // รองรับกรณีส่ง Body มาด้วย
    
    console.log({ success: true, message: `เพิ่มข้อมูลสำหรับผู้ใช้ ID: ${id} สำเร็จ`, status: 201 });

    return NextResponse.json(
      {
        success: true,
        message: `เพิ่มข้อมูลสำหรับผู้ใช้ ID: ${id} สำเร็จ`,
        data: body,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

//================================================================================
// PUT Function (แก้ไขข้อมูลทั้งหมด)
//================================================================================
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    return NextResponse.json(
      {
        success: true,
        message: `แก้ไขข้อมูลทั้งหมดของ User ID: ${id} สำเร็จ`,
        data: body,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

//================================================================================
// PATCH Function (แก้ไขข้อมูลบางส่วน)
//================================================================================
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));

    return NextResponse.json(
      {
        success: true,
        message: `อัปเดตข้อมูลบางส่วนของ User ID: ${id} สำเร็จ`,
        data: body,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

//================================================================================
// DELETE Function (ลบข้อมูล)
//================================================================================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    return NextResponse.json(
      {
        success: true,
        message: `ลบผู้ใช้ ID: ${id} สำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}