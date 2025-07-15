"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { submitVote } from "@/utils/clientEmailService";
import { candidates } from "@/data/candidates";

interface SubmitVoteButtonProps {
  selectedVotes: string[];
  membershipDetails: {
    name: string;
    membershipNumber: string;
    membershipCategory: string;
    email: string;
    region: string;
  };
}

export function SubmitVoteButton({
  selectedVotes,
  membershipDetails,
}: SubmitVoteButtonProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSelectedCandidateNames = () => {
    return selectedVotes
      .map((id) => candidates.find((c) => c.id === id)?.name)
      .filter(Boolean);
  };

  const validateForm = () => {
    const errors = [];

    if (!membershipDetails.name.trim()) {
      errors.push("Full name is required");
    }

    if (!membershipDetails.idNumber.trim()) {
      errors.push("ID number is required");
    }

    if (!membershipDetails.email.trim()) {
      errors.push("Email address is required");
    } else if (!/^\S+@\S+\.\S+$/.test(membershipDetails.email)) {
      errors.push("Please enter a valid email address");
    }

    if (!membershipDetails.region) {
      errors.push("Please select your region");
    }

    if (!membershipDetails.membershipCategory) {
      errors.push("Please select your membership category");
    }

    if (selectedVotes.length < 2) {
      errors.push("Please select at least 2 candidates");
    }

    if (selectedVotes.length > 6) {
      errors.push("You cannot select more than 6 candidates");
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }

    return true;
  };

  const handleSubmitClick = () => {
    if (validateForm()) {
      setShowConfirmDialog(true);
    }
  };

  const handleFinalSubmit = async () => {
    if (!acceptedTerms) {
      toast.error("Please accept the POPI Act terms before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitVote(membershipDetails, selectedVotes);

      if (result.success) {
        toast.success(
          "🎉 Vote Successfully Submitted! 🎉\n\nThank you for participating in the SA Chefs Association Board of Directors election. Your vote has been recorded and a confirmation email has been sent to you.",
          {
            duration: 8000,
            style: {
              background: "#10B981",
              color: "white",
              fontSize: "clamp(14px, 4vw, 16px)",
              fontWeight: "bold",
              padding: "clamp(18px, 5vw, 24px)",
              borderRadius: "12px",
              textAlign: "center",
              lineHeight: "1.6",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
              border: "none",
              whiteSpace: "pre-line",
              minWidth: "300px",
            },
          }
        );
        setShowConfirmDialog(false);

        // Optionally reset form or redirect
        // You could add additional success handling here
      } else {
        throw new Error(result.error || "Failed to submit vote");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "There was an error submitting your vote. Please try again.";
      toast.error(errorMessage);
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        className="w-full max-w-md mx-auto my-8 bg-white text-black hover:bg-gray-400"
        size="lg"
        onClick={handleSubmitClick}
      >
        Submit Your Vote
      </Button>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              Please review your selection and confirm your submission
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-sm space-y-2">
              <p>
                <strong>Name:</strong> {membershipDetails.name}
              </p>
              <p>
                <strong>Membership Number:</strong>{" "}
                {membershipDetails.membershipNumber}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {membershipDetails.membershipCategory}
              </p>
              <p>
                <strong>Email:</strong> {membershipDetails.email}
              </p>
              <p>
                <strong>Region:</strong> {membershipDetails.region}
              </p>
              <p>
                <strong>Number of votes:</strong> {selectedVotes.length}
              </p>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <strong>Selected Candidates:</strong>
                <ul className="mt-2 list-disc pl-4">
                  {getSelectedCandidateNames().map((name, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) =>
                  setAcceptedTerms(checked as boolean)
                }
              />
              <Label htmlFor="terms" className="text-sm">
                I accept the POPI Act terms and confirm that all the information
                provided above is correct and true
              </Label>
            </div>
          </div>

          <DialogFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFinalSubmit}
              disabled={!acceptedTerms || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm and Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
