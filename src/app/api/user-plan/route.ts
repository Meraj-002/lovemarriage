import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type PlanRow = {
  subscription_id: number;
  plan_id: number;
  status: string;
  start_date: string;
  end_date: string;
  name: string;
  price: number;
};

function getPlanRank(planName: string) {
  const normalized = planName.toLowerCase();

  if (normalized === "diamond") return 3;
  if (normalized === "gold") return 2;
  return 1;
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const [rows] = await db.query(
      `
      SELECT 
        us.id AS subscription_id,
        us.plan_id,
        us.status,
        us.start_date,
        us.end_date,
        p.name,
        p.price
      FROM user_subscriptions us
      INNER JOIN plans p ON us.plan_id = p.id
      WHERE us.user_id = ?
        AND us.status = 'active'
      ORDER BY us.id DESC
      LIMIT 1
      `,
      [userId]
    );

    const result = rows as PlanRow[];

    if (result.length === 0) {
      return NextResponse.json({
        hasPlan: false,
        plan: null,
      });
    }

    const activePlan = result[0];

    return NextResponse.json({
      hasPlan: true,
      plan: {
        id: activePlan.plan_id,
        name: activePlan.name,
        price: activePlan.price,
        rank: getPlanRank(activePlan.name),
        status: activePlan.status,
        start_date: activePlan.start_date,
        end_date: activePlan.end_date,
      },
    });
  } catch (error) {
    console.error("User plan API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch user plan." },
      { status: 500 }
    );
  }
}