import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      age,
      city,
      profession,
      description,
      image_url,
      plan_type,
      whatsapp_number,
      is_active,
    } = body;

    if (!name || !age || !city || !profession || !plan_type) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const numericAge = Number(age);

    if (Number.isNaN(numericAge) || numericAge < 18 || numericAge > 99) {
      return NextResponse.json(
        { error: "Please enter a valid age." },
        { status: 400 }
      );
    }

    await db.query(
      `
      INSERT INTO profiles
      (name, age, city, profession, description, image_url, plan_type, whatsapp_number, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name.trim(),
        numericAge,
        city.trim(),
        profession.trim(),
        description?.trim() || null,
        image_url?.trim() || null,
        String(plan_type).toLowerCase(),
        whatsapp_number?.trim() || null,
        is_active ? 1 : 0,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Profile added successfully.",
    });
  } catch (error) {
    console.error("Admin add profile API error:", error);
    return NextResponse.json(
      { error: "Failed to add profile." },
      { status: 500 }
    );
  }
}