import { NextResponse } from "next/server";

// ================================================================================
// GET By ID Function (/src/app/api/users/[id]/route.js)
// ================================================================================
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    console.log({ success: true, message: `ดึงข้อมูลผู้ใช้ ID: ${id} สำเร็จ`, status: 201 });

    return NextResponse.json(
      {
        success: true,
        message: `ดึงข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
        userId: id,
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

// ================================================================================
// PUT By ID Function (/src/app/api/users/[id]/route.js)
// ================================================================================
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    console.log({ success: true, message: `อัปเดตข้อมูลผู้ใช้ ID: ${id} สำเร็จ`, status: 201 });

    return NextResponse.json(
      {
        success: true,
        message: `อัปเดตข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
        userId: id,
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

// ================================================================================
// DELETE By ID Function (/src/app/api/users/[id]/route.js)
// ================================================================================
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    console.log({ success: true, message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ`, status: 201 });

    return NextResponse.json(
      {
        success: true,
        message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
        userId: id,
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