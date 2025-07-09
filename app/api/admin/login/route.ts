import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required" },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD environment variable not set");
      return NextResponse.json(
        { success: false, error: "Admin authentication not configured" },
        { status: 500 }
      );
    }

    // For simplicity, we're using a direct password comparison
    // In production, you would want to use hashed passwords stored in the database
    const isValidPassword = password === adminPassword;

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    // Set a simple session cookie (in production, use proper JWT or session management)
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    // Set a basic auth cookie that expires in 1 hour
    response.cookies.set("admin-auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
