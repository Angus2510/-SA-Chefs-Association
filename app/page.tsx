"use client";

import Image from "next/image";
import { useState } from "react";
import MembershipForm from "@/components/membership-form";
import ProfileCardDemo from "@/components/profile-card-demo";
import TermsDialog from "@/components/terms-dialog";
import { SubmitVoteButton } from "@/components/submitButton";

interface MembershipDetails {
  name: string;
  membershipNumber: string;
  membershipCategory: string;
  email: string;
  region: string;
}

export default function Home() {
  const [selectedVotes, setSelectedVotes] = useState<string[]>([]);
  const [membershipDetails, setMembershipDetails] = useState<MembershipDetails>(
    {
      name: "",
      membershipNumber: "",
      membershipCategory: "professional",
      email: "",
      region: "gauteng",
    }
  );

  return (
    <div className="min-h-screen bg-[#1b2942] pb-12">
      <TermsDialog />

      {/* Header */}
      <header className="py-8">
        <Image
          src="/SA-chefs-logo-white.png"
          alt="SA Chefs Association Logo"
          width={200}
          height={200}
          className="mx-auto"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold text-center my-8 text-white px-4">
          SA Chefs Association - Board of Directors 2025-2027 Voting Form
        </h1>
      </header>

      {/* Voting Rules Section */}
      <section className="max-w-4xl mx-auto px-4 mb-8 text-white">
        <div className="rounded-xl p-6 shadow-lg bg-white/5">
          <h2 className="text-xl font-bold mb-4">
            As per the rules of the Association:
          </h2>

          <p className="mb-4">
            Voting members may vote only in the election of national officers
            and all other business on the agenda at the Annual General Meeting
            (AGM). All other business requiring the vote of members is vested in
            the Board of SA Chefs.
          </p>

          <h3 className="font-bold mt-4 mb-2">2.2.1 Voting Members</h3>
          <p className="mb-4">
            The following shall form part of the Voting Members class and shall
            be designated by the name below, without creating a separate class
            in each instance. Members below in good standing* shall have full
            voting rights.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold">
                2.2.1.1 Professional Membership sub-category
              </h4>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  A Voting Member who falls within the sub-category of being a
                  professional membership of the hospitality and supporting
                  industries with a minimum of three (3) years&apos; experience
                  in the industry;
                </li>
                <li>
                  A Voting Member who has followed an SA Chefs recognised
                  training program or has been an Intermediate Member in good
                  standing for a minimum of three (3) consecutive years.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold">
                2.2.1.2 Foreign Based Professional Membership sub-category
              </h4>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  A Voting Member who falls within the sub-category of being a
                  professional member of the hospitality and supporting
                  industries with a minimum of three (3) years&apos; experience
                  in the industry, who resides outside the republic of South
                  Africa;
                </li>
                <li>
                  A Voting Member who has followed an SA Chefs recognised
                  training program or has been part of the Intermediate
                  Membership sub-category.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold">
                2.2.1.3 Intermediate Membership sub-category
              </h4>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  A Voting Member who has not yet obtained three (3) years&apos;
                  professional experience in hospitality and supporting
                  industries shall be categorised as qualifying for Intermediate
                  Membership.
                </li>
                <li>
                  After three (3) consecutive years of membership in good
                  standing*, an application may be made by Voting Members
                  qualifying for SA Chefs Professional Membership.
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-6 text-lg font-bold text-amber-400">
            Voting is open from 2 March until 15 March - No votes will be
            counted after the closing date
          </p>
        </div>
      </section>

      {/* Membership Form Section */}
      <section className="mb-12">
        <MembershipForm
          membershipDetails={membershipDetails}
          setMembershipDetails={setMembershipDetails}
        />
      </section>

      {/* Voting Section */}
      <section className="mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center my-8 text-white px-4">
          Mark your Vote for the Candidates of your Choice
          <span className="block text-lg text-gray-300 mt-2">
            (Select a minimum of 2 and up to a maximum of 8 candidates)
          </span>
        </h3>

        <ProfileCardDemo
          selectedVotes={selectedVotes}
          setSelectedVotes={setSelectedVotes}
        />
      </section>

      {/* Submit Button Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="w-full flex justify-center">
          <SubmitVoteButton
            selectedVotes={selectedVotes}
            membershipDetails={membershipDetails}
          />
        </div>
      </section>
    </div>
  );
}
