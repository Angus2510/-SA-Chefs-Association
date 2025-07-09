/**
 * Client-side email sender that uses the API route
 */
export const sendEmail = async (
  email: string,
  title: string,
  message: string
) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, title, message }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

/**
 * Submit vote data to the voting API
 */
export const submitVote = async (
  membershipDetails: {
    name: string;
    membershipNumber: string;
    membershipCategory: string;
    email: string;
    region: string;
  },
  selectedVotes: string[]
) => {
  try {
    const response = await fetch("/api/submit-vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        membershipDetails,
        selectedVotes,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit vote");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting vote:", error);
    throw error;
  }
};
