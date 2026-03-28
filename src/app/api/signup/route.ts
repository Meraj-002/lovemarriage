import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, password } = body;

    if (!name || !phone || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const normalizedPhone = String(phone).replace(/\D/g, "");

    if (normalizedPhone.length !== 10) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (String(password).length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const [existingRows] = await db.query(
      "SELECT id FROM users WHERE phone = ? LIMIT 1",
      [normalizedPhone]
    );

    const existingUsers = existingRows as { id: number }[];

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "User already exists. Please login." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [insertResult] = await db.query(
      "INSERT INTO users (name, phone, password, created_at) VALUES (?, ?, ?, NOW())",
      [name.trim(), normalizedPhone, hashedPassword]
    );

    const result = insertResult as { insertId: number };

    const [userRows] = await db.query(
      "SELECT id, name, phone, created_at FROM users WHERE id = ? LIMIT 1",
      [result.insertId]
    );

    const users = userRows as {
      id: number;
      name: string;
      phone: string;
      created_at: string;
    }[];

    return NextResponse.json({
      message: "Account created successfully.",
      user: users[0],
    });
  } catch (error) {
    console.error("Signup API error:", error);

    return NextResponse.json(
      { error: "Something went wrong during signup." },
      { status: 500 }
    );
  }
}