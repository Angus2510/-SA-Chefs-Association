import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Specify that this should run on Node.js runtime
export const runtime = "nodejs";
export const preferredRegion = "auto";

export async function GET() {
  try {
    // Simple database connection test
    await prisma.$connect();

    return NextResponse.json({
      success: true,
      message: "API and database connection healthy",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Database connection failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
