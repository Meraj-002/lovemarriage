import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type ExistingRow = {
  id: number;
};

type IncomingPlan = {
  id: number;
  price: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { upi_id, qr_image, telegram_link, plans } = body as {
      upi_id: string;
      qr_image: string;
      telegram_link: string;
      plans: IncomingPlan[];
    };

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

    const existing = rows as ExistingRow[];

    if (existing.length === 0) {
      await db.query(
        `
        INSERT INTO payment_settings (upi_id, qr_image, telegram_link)
        VALUES (?, ?, ?)
        `,
        [
          String(upi_id).trim(),
          String(qr_image).trim(),
          String(telegram_link || "").trim(),
        ]
      );
    } else {
      await db.query(
        `
        UPDATE payment_settings
        SET upi_id = ?, qr_image = ?, telegram_link = ?
        WHERE id = ?
        `,
        [
          String(upi_id).trim(),
          String(qr_image).trim(),
          String(telegram_link || "").trim(),
          existing[0].id,
        ]
      );
    }

    if (Array.isArray(plans)) {
      for (const plan of plans) {
        await db.query(
          `
          UPDATE plans
          SET price = ?
          WHERE id = ?
          `,
          [Number(plan.price), Number(plan.id)]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully.",
    });
  } catch (error) {
    console.error("Payment settings POST error:", error);

    return NextResponse.json(
      { error: "Failed to update settings." },
      { status: 500 }
    );
  }
}