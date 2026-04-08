import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type PaymentSettingsRow = {
  id: number;
  upi_id: string;
  qr_image: string;
};

export async function GET() {
  try {
    const [rows] = await db.query(
      `
      SELECT id, upi_id, qr_image
      FROM payment_settings
      ORDER BY id ASC
      LIMIT 1
      `
    );

    const data = rows as PaymentSettingsRow[];

    if (data.length === 0) {
      return NextResponse.json({
        upi_id: "lovemarriage@paytm",
        qr_image:
          "https://expressionengine.com/asset/img/add-on-details/qrcode_3.png",
      });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Payment settings GET error:", error);

    return NextResponse.json(
      { error: "Failed to fetch payment settings." },
      { status: 500 }
    );
  }
}