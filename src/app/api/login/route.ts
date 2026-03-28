import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json(
        { error: "Phone and password are required." },
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

    const [rows] = await db.query(
      "SELECT id, name, phone, password, created_at FROM users WHERE phone = ? LIMIT 1",
      [normalizedPhone]
    );

    const users = rows as {
      id: number;
      name: string;
      phone: string;
      password: string;
      created_at: string;
    }[];

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Invalid phone or password." },
        { status: 400 }
      );
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid phone or password." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      { error: "Something went wrong during login." },
      { status: 500 }
    );
  }
}