import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search") || "";
    const city = req.nextUrl.searchParams.get("city") || "all";
    const membership = req.nextUrl.searchParams.get("membership") || "all";
    const ageRange = req.nextUrl.searchParams.get("ageRange") || "all";
    const sortBy = req.nextUrl.searchParams.get("sortBy") || "recent";
    const limit = Number(req.nextUrl.searchParams.get("limit") || "60");

    let sql = `
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
      WHERE is_active = 1
    `;

    const values: (string | number)[] = [];

    if (search.trim()) {
      sql += ` AND name LIKE ? `;
      values.push(`%${search.trim()}%`);
    }

    if (city !== "all") {
      sql += ` AND city = ? `;
      values.push(city);
    }

    if (membership !== "all") {
      sql += ` AND LOWER(plan_type) = ? `;
      values.push(membership.toLowerCase());
    }

    if (ageRange !== "all") {
      const [min, max] = ageRange.split("-").map(Number);
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        sql += ` AND age BETWEEN ? AND ? `;
        values.push(min, max);
      }
    }

    if (sortBy === "name_asc") {
      sql += ` ORDER BY name ASC `;
    } else if (sortBy === "age_asc") {
      sql += ` ORDER BY age ASC `;
    } else if (sortBy === "age_desc") {
      sql += ` ORDER BY age DESC `;
    } else {
      sql += ` ORDER BY id DESC `;
    }

    sql += ` LIMIT ? `;
    values.push(limit);

    const [rows] = await db.query(sql, values);

    return NextResponse.json({
      profiles: rows,
    });
  } catch (error) {
    console.error("Profiles API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles." },
      { status: 500 }
    );
  }
}