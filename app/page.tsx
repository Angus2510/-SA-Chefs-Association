// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import Link from "next/link";
// import MembershipForm from "@/components/membership-form";
// import ProfileCardDemo from "@/components/profile-card-demo";
// import TermsDialog from "@/components/terms-dialog";
// import { SubmitVoteButton } from "@/components/submitButton";
// import { Button } from "@/components/ui/button";

// interface MembershipDetails {
//   name: string;
//   idNumber: string;
//   membershipNumber: string;
//   membershipCategory: string;
//   email: string;
//   region: string;
// }

// export default function Home() {
//   const [selectedVotes, setSelectedVotes] = useState<string[]>([]);
//   const [membershipDetails, setMembershipDetails] = useState<MembershipDetails>(
//     {
//       name: "",
//       idNumber: "",
//       membershipNumber: "",
//       membershipCategory: "professional",
//       email: "",
//       region: "gauteng",
//     }
//   );

//   return (
//     <div className="min-h-screen bg-[#1b2942] pb-12">
//       <TermsDialog />

//       {/* Header */}
//       <header className="py-8 relative">
//         {/* Discreet Admin Button */}
//         <div className="absolute top-4 right-4">
//           <Link href="/admin">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-white/60 hover:text-white hover:bg-white/10 text-xs"
//             >
//               Admin
//             </Button>
//           </Link>
//         </div>

//         <Image
//           src="/SA-chefs-logo-white.png"
//           alt="SA Chefs Association Logo"
//           width={200}
//           height={200}
//           className="mx-auto"
//           priority
//         />
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center my-8 text-white px-4">
//           SA Chefs Association - Board of Directors 2025-2027 Voting Form
//         </h1>
//       </header>

//       {/* Voting Rules Section */}
//       <section className="max-w-4xl mx-auto px-4 mb-8 text-white">
//         <div className="rounded-xl p-6 shadow-lg bg-white/5">
//           <h2 className="text-xl font-bold mb-4">
//             As per the rules of the Association:
//           </h2>

//           <p className="mb-4">
//             Voting members may vote only in the election of national officers
//             and all other business on the agenda at the Annual General Meeting
//             (AGM). All other business requiring the vote of members is vested in
//             the Board of SA Chefs.
//           </p>

//           <h3 className="font-bold mt-4 mb-2">2.2.1 Voting Members</h3>
//           <p className="mb-4">
//             The following shall form part of the Voting Members categories and
//             shall be designated by the name below, without creating a separate
//             class in each instance. Members below in good standing* shall have
//             full voting rights.
//           </p>

//           <div className="space-y-4">
//             <div>
//               <h4 className="font-bold">
//                 2.2.1.1 Professional Membership sub-category
//               </h4>
//               <ul className="list-disc pl-6 mt-2">
//                 <li>
//                   A Voting Member who falls within the sub-category of being a
//                   professional membership of the hospitality and supporting
//                   industries with a minimum of three (3) years&apos; experience
//                   in the industry;
//                 </li>
//                 <li>
//                   A Voting Member who has followed an SA Chefs recognised
//                   training program or has been an Intermediate Member in good
//                   standing for a minimum of three (3) consecutive years.
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold">
//                 2.2.1.2 Foreign Based Professional Membership sub-category
//               </h4>
//               <ul className="list-disc pl-6 mt-2">
//                 <li>
//                   A Voting Member who falls within the sub-category of being a
//                   professional member of the hospitality and supporting
//                   industries with a minimum of three (3) years&apos; experience
//                   in the industry, who resides outside the republic of South
//                   Africa;
//                 </li>
//                 <li>
//                   A Voting Member who has followed an SA Chefs recognised
//                   training program or has been part of the Intermediate
//                   Membership sub-category.
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-bold">
//                 2.2.1.3 Intermediate Membership sub-category
//               </h4>
//               <ul className="list-disc pl-6 mt-2">
//                 <li>
//                   A Voting Member who has not yet obtained three (3) years&apos;
//                   professional experience in hospitality and supporting
//                   industries shall be categorised as qualifying for Intermediate
//                   Membership.
//                 </li>
//                 <li>
//                   After three (3) consecutive years of membership in good
//                   standing*, an application may be made by Voting Members
//                   qualifying for SA Chefs Professional Membership.
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
//             <p className="text-lg font-bold text-amber-400 mb-2">
//               Election Information:
//             </p>
//             <p className="text-white mb-2">
//               • <strong>6 seats</strong> are up for election on the Board of
//               Directors
//             </p>
//             <p className="text-white mb-4">
//               • Each member may cast up to <strong>6 votes</strong> (minimum 2
//               votes required)
//             </p>
//           </div>

//           <p className="mt-6 text-lg font-bold text-amber-400">
//             Voting is open from 10/07/25 until 26/07/25 - No votes will be
//             counted after the closing date
//           </p>
//         </div>
//       </section>

//       {/* Membership Form Section */}
//       <section className="mb-12">
//         <MembershipForm
//           membershipDetails={membershipDetails}
//           setMembershipDetails={setMembershipDetails}
//         />
//       </section>

//       {/* Voting Section */}
//       <section className="mb-12">
//         <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center my-8 text-white px-4">
//           Mark your Vote for the Candidates of your Choice
//           <span className="block text-sm sm:text-lg text-gray-300 mt-2">
//             (Select a minimum of 2 and up to 6 candidates)
//           </span>
//         </h3>

//         <ProfileCardDemo
//           selectedVotes={selectedVotes}
//           setSelectedVotes={setSelectedVotes}
//         />
//       </section>

//       {/* Submit Button Section */}
//       <section className="max-w-4xl mx-auto px-4">
//         <div className="w-full flex justify-center">
//           <SubmitVoteButton
//             selectedVotes={selectedVotes}
//             membershipDetails={membershipDetails}
//           />
//         </div>
//       </section>
//     </div>
//   );
// }

export default function Home() {
  // Voting is closed, show message only
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b2942]">
      <div className="bg-white/90 rounded-xl shadow-lg p-10 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-[#1b2942] mb-4">
          Voting has been completed
        </h1>
        <p className="text-lg text-gray-700">
          Thank you for your participation. The voting period is now closed and
          no further votes can be submitted.
        </p>
      </div>
    </div>
  );
}
