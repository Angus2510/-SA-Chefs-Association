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

  const validateForm = () => {
    const errors = [];

    if (!membershipDetails.name.trim()) {
      errors.push("Full name is required");
    }

    if (!membershipDetails.membershipNumber.trim()) {
      errors.push("Membership number is required");
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

    if (selectedVotes.length > 8) {
      errors.push("You cannot select more than 8 candidates");
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
      const submission = {
        membershipDetails,
        selectedVotes,
        submittedAt: new Date().toISOString(),
      };

      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/submit-vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error("Failed to submit vote");
      }

      toast.success("Your vote has been successfully submitted!");
      setShowConfirmDialog(false);

      // Optional: Redirect to a success page
      // router.push('/thank-you');
    } catch (error) {
      toast.error("There was an error submitting your vote. Please try again.");
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
