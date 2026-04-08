import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { upi_id, qr_image } = body;

    if (!upi_id || !qr_image) {
      return NextResponse.json(
        { error: "UPI ID and QR image are required." },
        { status: 400 }
      );
    }

    const [rows] = await db.query(
      `
      SELECT id
      FROM payment_settings
      ORDER BY id ASC
      LIMIT 1
      `
    );

    const existing = rows as { id: number }[];

    if (existing.length === 0) {
      await db.query(
        `
        INSERT INTO payment_settings (upi_id, qr_image)
        VALUES (?, ?)
        `,
        [String(upi_id).trim(), String(qr_image).trim()]
      );
    } else {
      await db.query(
        `
        UPDATE payment_settings
        SET upi_id = ?, qr_image = ?
        WHERE id = ?
        `,
        [String(upi_id).trim(), String(qr_image).trim(), existing[0].id]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment settings updated successfully.",
    });
  } catch (error) {
    console.error("Payment settings POST error:", error);

    return NextResponse.json(
      { error: "Failed to update payment settings." },
      { status: 500 }
    );
  }
}