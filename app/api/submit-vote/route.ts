import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";
import { candidates } from "@/data/candidates";

// Specify that this should run on Node.js runtime
export const runtime = "nodejs";
export const preferredRegion = "auto";

interface VoteSubmission {
  membershipDetails: {
    name: string;
    idNumber: string;
    membershipNumber: string;
    membershipCategory: string;
    email: string;
    region: string;
  };
  selectedVotes: string[];
  timestamp: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 15000, // 15 seconds
  greetingTimeout: 15000, // 15 seconds
  socketTimeout: 15000, // 15 seconds
});

// Generate candidate mapping from the actual candidates data
const candidateMap: { [key: string]: string } = candidates.reduce(
  (map, candidate) => {
    map[candidate.id] = candidate.name;
    return map;
  },
  {} as { [key: string]: string }
);

// Helper function to get candidate names from IDs
function getCandidateNames(candidateIds: string[]): string[] {
  return candidateIds.map((id) => candidateMap[id] || id);
}

// Helper function to generate email content
function generateVoteConfirmationEmail(voteData: VoteSubmission): string {
  const { membershipDetails, selectedVotes, timestamp } = voteData;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { max-width: 200px; height: auto; }
        h1 { color: #1b2942; margin: 20px 0; }
        h2 { color: #1b2942; border-bottom: 2px solid #1b2942; padding-bottom: 10px; }
        .vote-details { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .vote-list { list-style: none; padding: 0; }
        .vote-item { background-color: white; margin: 8px 0; padding: 12px; border-radius: 5px; border-left: 4px solid #1b2942; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666; }
        .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0; color: #856404; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SA Chefs Association</h1>
          <h2>Vote Confirmation - Board of Directors 2025-2027</h2>
        </div>
        
        <p>Dear ${membershipDetails.name},</p>
        
        <p>Thank you for participating in the SA Chefs Association Board of Directors election. Your vote has been successfully recorded.</p>
        
        <div class="vote-details">
          <h3>Your Voting Details:</h3>
          <p><strong>Name:</strong> ${membershipDetails.name}</p>
          <p><strong>ID Number:</strong> ${membershipDetails.idNumber}</p>
          <p><strong>Membership Number:</strong> ${
            membershipDetails.membershipNumber || "Not provided"
          }</p>
          <p><strong>Membership Category:</strong> ${
            membershipDetails.membershipCategory
          }</p>
          <p><strong>Region:</strong> ${membershipDetails.region}</p>
          <p><strong>Vote Submitted:</strong> ${new Date(
            timestamp
          ).toLocaleString()}</p>
        </div>
        
        <h3>Your Selected Candidates (${selectedVotes.length} selections):</h3>
        <ul class="vote-list">
          ${getCandidateNames(selectedVotes)
            .map(
              (candidateName) => `<li class="vote-item">✓ ${candidateName}</li>`
            )
            .join("")}
        </ul>
        
        <div class="warning">
          <strong>Important:</strong> This confirmation serves as your receipt. Please keep this email for your records. If you believe there has been an error, please contact the SA Chefs Association immediately.
        </div>
        
        <div class="footer">
          <p>This is an automated confirmation email for the SA Chefs Association Board of Directors election 2025-2027.</p>
          <p>Voting Period: 2 March - 15 March</p>
          <p>© SA Chefs Association</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Helper function to generate admin notification email
function generateAdminNotificationEmail(voteData: VoteSubmission): string {
  const { membershipDetails, selectedVotes, timestamp } = voteData;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #1b2942; }
        .vote-details { background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .vote-list { list-style: none; padding: 0; }
        .vote-item { background-color: white; margin: 5px 0; padding: 10px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🗳️ New Vote Submitted - SA Chefs Board Election</h1>
        
        <div class="vote-details">
          <h3>Voter Information:</h3>
          <p><strong>Name:</strong> ${membershipDetails.name}</p>
          <p><strong>Email:</strong> ${membershipDetails.email}</p>
          <p><strong>ID Number:</strong> ${membershipDetails.idNumber}</p>
          <p><strong>Membership Number:</strong> ${
            membershipDetails.membershipNumber || "Not provided"
          }</p>
          <p><strong>Category:</strong> ${
            membershipDetails.membershipCategory
          }</p>
          <p><strong>Region:</strong> ${membershipDetails.region}</p>
          <p><strong>Timestamp:</strong> ${new Date(
            timestamp
          ).toLocaleString()}</p>
        </div>
        
        <h3>Selected Candidates (${selectedVotes.length} selections):</h3>
        <ul class="vote-list">
          ${getCandidateNames(selectedVotes)
            .map(
              (candidateName) => `<li class="vote-item">${candidateName}</li>`
            )
            .join("")}
        </ul>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: Request) {
  try {
    console.log("Starting vote submission process...");

    const voteData: VoteSubmission = await request.json();
    console.log("Vote data received:", {
      email: voteData.membershipDetails?.email,
      votesCount: voteData.selectedVotes?.length,
    });

    // Validate the vote data
    if (!voteData.membershipDetails || !voteData.selectedVotes) {
      console.log("Missing required vote data");
      return NextResponse.json(
        { success: false, error: "Missing required vote data" },
        { status: 400 }
      );
    }

    // Validate vote count (minimum 2, maximum 8)
    if (
      voteData.selectedVotes.length < 2 ||
      voteData.selectedVotes.length > 8
    ) {
      return NextResponse.json(
        { success: false, error: "Please select between 2 and 6 candidates" },
        { status: 400 }
      );
    }

    // Validate required membership details
    const { name, idNumber, membershipNumber, email } =
      voteData.membershipDetails;
    if (!name || !idNumber || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required membership details" },
        { status: 400 }
      );
    }

    // Add timestamp if not provided
    if (!voteData.timestamp) {
      voteData.timestamp = new Date().toISOString();
    }

    // Check if this email address has already voted
    console.log("Checking for existing vote by email...");
    const existingVoteByEmail = await prisma.vote.findUnique({
      where: { email },
    });

    if (existingVoteByEmail) {
      console.log("Email already voted:", email);
      return NextResponse.json(
        {
          success: false,
          error: "This email address has already submitted a vote",
        },
        { status: 409 }
      );
    }

    // Check if this ID number has already voted
    // We'll search in membershipNumber field for now since it contains ID numbers
    console.log("Checking for existing vote by ID number...");
    const existingVoteByIdNumber = await prisma.vote.findFirst({
      where: {
        membershipNumber: idNumber,
      },
    });

    if (existingVoteByIdNumber) {
      console.log("ID number already voted:", idNumber);
      return NextResponse.json(
        {
          success: false,
          error: "This ID number has already submitted a vote",
        },
        { status: 409 }
      );
    }

    // Verify transporter connection
    console.log("Verifying email transporter...");
    await transporter.verify();

    // Save vote to database
    // Store ID number in membershipNumber field for now to maintain compatibility
    console.log("Saving vote to database...");
    const savedVote = await prisma.vote.create({
      data: {
        name,
        membershipNumber: idNumber, // Store ID number here for uniqueness
        membershipCategory: voteData.membershipDetails.membershipCategory,
        email,
        region: voteData.membershipDetails.region,
        selectedVotes: voteData.selectedVotes,
        submittedAt: new Date(voteData.timestamp),
        // Optional: Add IP address and user agent for security
        ipAddress:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });
    console.log("Vote saved successfully:", savedVote.id);

    // Send confirmation email to voter
    const voterMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        "SA Chefs Association - Vote Confirmation (Board of Directors 2025-2027)",
      html: generateVoteConfirmationEmail(voteData),
    };

    // Send notification email to admin(s) (if admin email is configured)
    const adminEmails = process.env.ADMIN_EMAIL;
    let adminEmailSent = false;

    if (adminEmails) {
      // Split by comma and trim whitespace to support multiple admin emails
      const adminEmailList = adminEmails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email);

      for (const adminEmail of adminEmailList) {
        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: adminEmail,
          subject: `New Vote Submitted - ${name} (ID: ${idNumber})`,
          html: generateAdminNotificationEmail(voteData),
        };

        try {
          await transporter.sendMail(adminMailOptions);
          adminEmailSent = true;
        } catch (adminEmailError) {
          console.error(
            `Failed to send admin notification to ${adminEmail}:`,
            adminEmailError
          );
          // Continue execution - voter confirmation is more important
        }
      }
    }

    // Send voter confirmation email
    const voterEmailInfo = await transporter.sendMail(voterMailOptions);

    // Update vote record with email confirmation
    await prisma.vote.update({
      where: { id: savedVote.id },
      data: {
        confirmationEmailSent: true,
        emailMessageId: voterEmailInfo.messageId,
      },
    });

    // Update vote analytics
    await updateVoteAnalytics(
      voteData.selectedVotes,
      voteData.membershipDetails
    );

    console.log("Vote recorded in database:", {
      id: savedVote.id,
      voter: `${name} (ID: ${idNumber})`,
      membershipNumber: membershipNumber || "Not provided",
      storedAs: "ID number stored in membershipNumber field",
      votes: voteData.selectedVotes.length,
      timestamp: voteData.timestamp,
    });

    return NextResponse.json({
      success: true,
      message: "Vote submitted successfully",
      confirmationEmailSent: true,
      adminNotificationSent: adminEmailSent,
      messageId: voterEmailInfo.messageId,
      voteId: savedVote.id,
    });
  } catch (error) {
    console.error("Error processing vote:", error);

    // Return more specific error information for debugging
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    console.error("Error details:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : "No stack trace available",
      name: error instanceof Error ? error.name : "Unknown",
    });

    // Check if this is a unique constraint violation (duplicate vote)
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        {
          success: false,
          error: "This email address has already submitted a vote.",
        },
        { status: 409 }
      );
    }

    // Check for database connection errors
    if (
      error instanceof Error &&
      (error.message.includes("connection") ||
        error.message.includes("timeout"))
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection error. Please try again in a moment.",
        },
        { status: 503 }
      );
    }

    // Check for email sending errors
    if (error instanceof Error && error.message.includes("SMTP")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service temporarily unavailable. Please try again later.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process vote submission. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

// Helper function to update vote analytics
async function updateVoteAnalytics(
  selectedVotes: string[],
  membershipDetails: VoteSubmission["membershipDetails"]
) {
  const { region, membershipCategory } = membershipDetails;

  for (const candidateId of selectedVotes) {
    // Get or create analytics record for this candidate
    const existingAnalytics = await prisma.voteAnalytics.findUnique({
      where: { candidateId },
    });

    const regionField = getRegionField(region);
    const categoryField = getCategoryField(membershipCategory);

    if (existingAnalytics) {
      // Update existing analytics
      await prisma.voteAnalytics.update({
        where: { candidateId },
        data: {
          voteCount: { increment: 1 },
          [regionField]: { increment: 1 },
          [categoryField]: { increment: 1 },
        },
      });
    } else {
      // Create new analytics record
      const baseAnalytics = {
        candidateId,
        candidateName: candidateMap[candidateId] || candidateId,
        voteCount: 1,
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
      };

      const newAnalytics = {
        ...baseAnalytics,
        [regionField]: 1,
        [categoryField]: 1,
      };

      await prisma.voteAnalytics.create({ data: newAnalytics });
    }
  }
}

// Helper function to map region to database field
function getRegionField(region: string): string {
  const regionMap: { [key: string]: string } = {
    gauteng: "gautengVotes",
    "western-cape": "westernCapeVotes",
    "kwazulu-natal": "kznVotes",
    "eastern-cape": "easternCapeVotes",
    "free-state": "freeStateVotes",
    limpopo: "limpopoVotes",
    mpumalanga: "mpumalangaVotes",
    "north-west": "northWestVotes",
    "northern-cape": "northernCapeVotes",
  };
  return regionMap[region] || "gautengVotes";
}

// Helper function to map membership category to database field
function getCategoryField(category: string): string {
  const categoryMap: { [key: string]: string } = {
    professional: "professionalVotes",
    intermediate: "intermediateVotes",
    "foreign-based": "foreignBasedVotes",
  };
  return categoryMap[category] || "professionalVotes";
}
