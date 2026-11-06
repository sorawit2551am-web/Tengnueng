// นำเข้า NextResponse จาก next/server เพื่อใช้จัดการและส่งค่า HTTP Response กลับไปยังไคลเอนต์
import { NextResponse } from "next/server";

//================================================================================
// GET Function (/src/app/api/users/route.js)
//================================================================================
/**
 * Route Handler สำหรับ HTTP Method: GET
 * ทำหน้าที่รองรับ Request แบบ GET ที่เข้ามายัง Endpoint นี้
 */
export async function GET() {
  try {
    // พิมพ์ Log ข้อความลงในฝั่งเซิร์ฟเวอร์ (Server Console) เพื่อใช้ในการ Monitor หรือ Debug
    console.log({ success: true, message: "ดึงข้อมูลผู้ใช้สำเร็จ", status: 200 });

    // ส่ง Response กลับไปยังฝั่ง Client ในรูปแบบ JSON
    // - Argument แรก: ข้อมูล Body ที่ต้องการส่งกลับไป
    // - Argument ที่สอง: การตั้งค่า HTTP Status Code (200 OK)
    return NextResponse.json(
      {
        success: true,
        message: "ดึงข้อมูลผู้ใช้สำเร็จ",
      },
      { status: 200 }
    );
  } catch (error) {
    // ดักจับ Error ที่อาจเกิดขึ้นระหว่างการทำงานใน try block
    // พร้อมส่ง HTTP Response แจ้งเตือนข้อผิดพลาดกลับไปยัง Client ด้วย Status 500 (Internal Server Error)
    return NextResponse.json(
      {
        success: false,
        message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        // ตรวจสอบ Type ของ error:
        // หาก error เป็น Instance ของ Error object จะดึง error.message มาใช้งาน
        // แต่ถ้าไม่ใช่ ให้ fallback เป็นข้อความเริ่มต้น "Internal Server Error"
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
//================================================================================
// POST Function (/src/app/api/users/route.js)
//================================================================================
export async function POST() {
  try {
    console.log({ success: true, message: "เพิ่มข้อมูลผู้ใช้สำเร็จ", status: 201 });
    return NextResponse.json(
      {
        success: true,
        message: "เพิ่มข้อมูลผู้ใช้สำเร็จ",
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