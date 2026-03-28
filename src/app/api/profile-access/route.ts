import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type PlanRow = {
  id: number;
  name: string;
};

type ProfileRow = {
  id: number;
  plan_type: string;
  whatsapp_number: string | null;
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
    const profileId = req.nextUrl.searchParams.get("profileId");

    if (!userId || !profileId) {
      return NextResponse.json(
        { error: "User ID and Profile ID are required." },
        { status: 400 }
      );
    }

    const [profileRows] = await db.query(
      `
      SELECT id, plan_type, whatsapp_number
      FROM profiles
      WHERE id = ? AND is_active = 1
      LIMIT 1
      `,
      [profileId]
    );

    const profiles = profileRows as ProfileRow[];

    if (profiles.length === 0) {
      return NextResponse.json(
        { error: "Profile not found." },
        { status: 404 }
      );
    }

    const profile = profiles[0];
    const requiredPlanRank = getPlanRank(profile.plan_type);

    const [subscriptionRows] = await db.query(
      `
      SELECT p.id, p.name
      FROM user_subscriptions us
      INNER JOIN plans p ON us.plan_id = p.id
      WHERE us.user_id = ?
        AND us.status = 'active'
      ORDER BY us.id DESC
      LIMIT 1
      `,
      [userId]
    );

    const subscriptions = subscriptionRows as PlanRow[];

    if (subscriptions.length === 0) {
      return NextResponse.json({
        allowed: false,
        requiredPlan: profile.plan_type,
      });
    }

    const userPlan = subscriptions[0];
    const userPlanRank = getPlanRank(userPlan.name);

    if (userPlanRank < requiredPlanRank) {
      return NextResponse.json({
        allowed: false,
        requiredPlan: profile.plan_type,
        currentPlan: userPlan.name,
      });
    }

    return NextResponse.json({
      allowed: true,
      whatsappNumber: profile.whatsapp_number,
    });
  } catch (error) {
    console.error("Profile access API error:", error);
    return NextResponse.json(
      { error: "Failed to check profile access." },
      { status: 500 }
    );
  }
}