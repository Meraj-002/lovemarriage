import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type CountRow = {
  total: number;
};

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search") || "";
    const city = req.nextUrl.searchParams.get("city") || "all";
    const membership = req.nextUrl.searchParams.get("membership") || "all";
    const ageRange = req.nextUrl.searchParams.get("ageRange") || "all";
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "recent";
    const limit = Number(req.nextUrl.searchParams.get("limit") || "60");

    let whereClause = ` WHERE is_active = 1 `;
    const whereValues: (string | number)[] = [];

    if (search.trim()) {
      whereClause += ` AND name LIKE ? `;
      whereValues.push(`%${search.trim()}%`);
    }

    if (city !== "all") {
      whereClause += ` AND city = ? `;
      whereValues.push(city);
    }

    if (membership !== "all") {
      whereClause += ` AND LOWER(plan_type) = ? `;
      whereValues.push(membership.toLowerCase());
    }

    if (ageRange !== "all") {
      const [min, max] = ageRange.split("-").map(Number);

      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        whereClause += ` AND age BETWEEN ? AND ? `;
        whereValues.push(min, max);
      }
    }

    let orderClause = ` ORDER BY id DESC `;

    if (sortBy === "name_asc") {
      orderClause = ` ORDER BY name ASC `;
    } else if (sortBy === "age_asc") {
      orderClause = ` ORDER BY age ASC `;
    } else if (sortBy === "age_desc") {
      orderClause = ` ORDER BY age DESC `;
    }

    const profilesSql = `
      SELECT
        id,
        name,
        age,
        city,
        profession,
        description,
        image_url,
        plan_type,
        whatsapp_number,
        is_active
      FROM profiles
      ${whereClause}
      ${orderClause}
      LIMIT ?
    `;

    const profilesValues = [...whereValues, limit];

    const totalSql = `
      SELECT COUNT(*) AS total
      FROM profiles
      ${whereClause}
    `;

    const [profilesRows] = await db.query(profilesSql, profilesValues);
    const [countRows] = await db.query(totalSql, whereValues);

    const total =
      ((countRows as CountRow[])[0]?.total ?? 0);

    return NextResponse.json({
      profiles: profilesRows,
      total,
    });
  } catch (error) {
    console.error("Profiles API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch profiles." },
      { status: 500 }
    );
  }
}