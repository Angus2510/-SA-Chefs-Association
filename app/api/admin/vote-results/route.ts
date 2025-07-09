import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Specify that this should run on Node.js runtime
export const runtime = "nodejs";
export const preferredRegion = "auto";

// Candidate mapping - keep this in sync with profile-card-demo.tsx
const candidateMap: { [key: string]: string } = {
  "1": "Alex Johnson",
  "2": "Sam Rivera",
  "3": "Taylor Kim",
};

// Helper function to check admin authentication
function isAuthenticated(request: Request): boolean {
  const cookies = request.headers.get("cookie");
  if (!cookies) return false;

  const authCookie = cookies
    .split(";")
    .find((c) => c.trim().startsWith("admin-auth="));
  return authCookie?.includes("authenticated") || false;
}

export async function GET(request: Request) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("Fetching vote results...");

    // Check environment variables
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL environment variable is not set");
      throw new Error("Database configuration error");
    }

    // Test database connection first
    try {
      await prisma.$connect();
      console.log("Database connected successfully");
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      throw new Error(
        `Database connection failed: ${
          dbError instanceof Error ? dbError.message : "Unknown error"
        }`
      );
    }

    // Get all votes count
    const totalVoters = await prisma.vote.count();
    console.log("Total voters:", totalVoters);

    // Get all votes to analyze
    const allVotes = await prisma.vote.findMany({
      select: {
        selectedVotes: true,
        region: true,
        membershipCategory: true,
      },
    });
    console.log("Retrieved votes:", allVotes.length);

    const totalVotes = allVotes.reduce(
      (sum: number, vote: { selectedVotes: string[] }) =>
        sum + vote.selectedVotes.length,
      0
    );

    // Generate vote analytics from current votes
    const candidateStats = generateCandidateStats(allVotes);

    console.log("Generated candidate stats:", candidateStats.length);

    return NextResponse.json({
      success: true,
      totalVoters,
      totalVotes,
      analyticsByCandidate: candidateStats,
    });
  } catch (error) {
    console.error("Error fetching vote results:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch vote results",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error("Error disconnecting from database:", disconnectError);
    }
  }
}

// Function to generate candidate statistics from votes
function generateCandidateStats(
  votes: Array<{
    selectedVotes: string[];
    region: string;
    membershipCategory: string;
  }>
) {
  const candidateStatsMap = new Map();

  // Process each vote
  votes.forEach((vote) => {
    vote.selectedVotes.forEach((candidateId) => {
      if (!candidateStatsMap.has(candidateId)) {
        candidateStatsMap.set(candidateId, {
          candidateId,
          candidateName: candidateMap[candidateId] || candidateId,
          voteCount: 0,
          gautengVotes: 0,
          westernCapeVotes: 0,
          kznVotes: 0,
          easternCapeVotes: 0,
          freeStateVotes: 0,
          limpopoVotes: 0,
          mpumalangaVotes: 0,
          northWestVotes: 0,
          northernCapeVotes: 0,
          professionalVotes: 0,
          intermediateVotes: 0,
          foreignBasedVotes: 0,
        });
      }

      const candidate = candidateStatsMap.get(candidateId);
      candidate.voteCount++;

      // Update regional counts
      switch (vote.region) {
        case "gauteng":
          candidate.gautengVotes++;
          break;
        case "western-cape":
          candidate.westernCapeVotes++;
          break;
        case "kwazulu-natal":
          candidate.kznVotes++;
          break;
        case "eastern-cape":
          candidate.easternCapeVotes++;
          break;
        case "free-state":
          candidate.freeStateVotes++;
          break;
        case "limpopo":
          candidate.limpopoVotes++;
          break;
        case "mpumalanga":
          candidate.mpumalangaVotes++;
          break;
        case "north-west":
          candidate.northWestVotes++;
          break;
        case "northern-cape":
          candidate.northernCapeVotes++;
          break;
        default:
          candidate.gautengVotes++;
          break;
      }

      // Update category counts
      switch (vote.membershipCategory) {
        case "professional":
          candidate.professionalVotes++;
          break;
        case "intermediate":
          candidate.intermediateVotes++;
          break;
        case "foreign-based":
          candidate.foreignBasedVotes++;
          break;
        default:
          candidate.professionalVotes++;
          break;
      }
    });
  });

  // Convert map to array and sort by vote count
  return Array.from(candidateStatsMap.values()).sort(
    (a: { voteCount: number }, b: { voteCount: number }) =>
      b.voteCount - a.voteCount
  );
}
