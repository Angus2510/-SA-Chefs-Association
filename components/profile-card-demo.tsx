"use client";

import ProfileCard from "./profile-card";
import { candidates } from "../data/candidates";

interface ProfileCardDemoProps {
  selectedVotes: string[];
  setSelectedVotes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProfileCardDemo({
  selectedVotes,
  setSelectedVotes,
}: ProfileCardDemoProps) {
  const handleVote = (id: string) => {
    setSelectedVotes((prev) => {
      // If already selected, remove the vote
      if (prev.includes(id)) {
        return prev.filter((voteId: string) => voteId !== id);
      }
      // If not selected and less than 6 votes, add the vote
      if (prev.length < 6) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6 p-3 sm:p-4 bg-white/10 rounded-lg mx-4 sm:mx-0">
        <p className="text-white text-center text-sm sm:text-base">
          Votes Selected: {selectedVotes.length} / 6
          {selectedVotes.length < 2 && (
            <span className="text-red-400 ml-2 block sm:inline">
              (Minimum 2 votes required)
            </span>
          )}
          {selectedVotes.length === 6 && (
            <span className="text-yellow-400 ml-2 block sm:inline">
              (Maximum votes reached)
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6 place-items-center [&>:last-child:nth-child(3n+1)]:xl:col-start-2">
        {candidates.map((candidate) => (
          <ProfileCard
            key={candidate.id}
            id={candidate.id}
            name={candidate.name}
            bio={candidate.bio}
            imageUrl={candidate.imageUrl}
            onVote={handleVote}
            isSelected={selectedVotes.includes(candidate.id)}
          />
        ))}
      </div>
    </div>
  );
}
