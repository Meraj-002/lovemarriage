import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type PaymentSettingsRow = {
  id: number;
  upi_id: string;
  qr_image: string;
  telegram_link: string | null;
};

type PlanRow = {
  id: number;
  name: string;
  price: number;
};

export async function GET() {
  try {
    const [settingsRows] = await db.query(
      `
      SELECT id, upi_id, qr_image, telegram_link
      FROM payment_settings
      ORDER BY id ASC
      LIMIT 1
      `
    );

    const [planRows] = await db.query(
      `
      SELECT id, name, price
      FROM plans
      ORDER BY rank ASC, id ASC
      `
    );

    const settings = settingsRows as PaymentSettingsRow[];
    const plans = planRows as PlanRow[];

    const defaultSettings = {
      upi_id: "lovemarriage@paytm",
      qr_image: "",
      telegram_link: "",
    };

    return NextResponse.json({
      ...(settings[0] || defaultSettings),
      plans,
    });
  } catch (error) {
    console.error("Payment settings GET error:", error);

    return NextResponse.json(
      { error: "Failed to fetch payment settings." },
      { status: 500 }
    );
  }
}