import { NextResponse } from "next/server";

// ================================================================================
// POST Function (/src/app/api/users/route.js)
// ================================================================================
export async function POST(request) {
  try {
    // รับข้อมูล JSON จาก Body ที่ส่งมา
    const body = await request.json().catch(() => ({}));
    const { name, email } = body;

    console.log({ success: true, message: "สร้างข้อมูลผู้ใช้สำเร็จ", status: 201 });

    return NextResponse.json(
      {
        success: true,
        message: "สร้างข้อมูลผู้ใช้สำเร็จ",
        data: { name, email },
      },
      { status: 201 } // กำหนด Status เป็น 201 Created ตามต้องการ
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