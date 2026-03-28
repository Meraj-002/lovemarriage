import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, planId, utrNumber } = body;

    if (!userId || !planId || !utrNumber) {
      return NextResponse.json(
        { error: "User ID, Plan ID and UTR Number are required." },
        { status: 400 }
      );
    }

    const numericPlanId = Number(planId);

    if (![1, 2, 3].includes(numericPlanId)) {
      return NextResponse.json(
        { error: "Invalid plan selected." },
        { status: 400 }
      );
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 6);

    await db.query(
      `
      INSERT INTO user_subscriptions
      (user_id, plan_id, status, start_date, end_date, created_at, utr_number)
      VALUES (?, ?, 'pending', ?, ?, NOW(), ?)
      `,
      [
        userId,
        numericPlanId,
        startDate.toISOString().slice(0, 19).replace("T", " "),
        endDate.toISOString().slice(0, 19).replace("T", " "),
        utrNumber.trim(),
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Payment submitted successfully. Your plan will be activated after admin verification.",
    });
  } catch (error) {
    console.error("Activate plan API error:", error);

    return NextResponse.json(
      { error: "Failed to submit payment details." },
      { status: 500 }
    );
  }
}