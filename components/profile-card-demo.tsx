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
      // If not selected and less than 8 votes, add the vote
      if (prev.length < 8) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl mb-6 p-4 bg-white/10 rounded-lg">
        <p className="text-white text-center">
          Votes Selected: {selectedVotes.length} / 8
          {selectedVotes.length < 2 && (
            <span className="text-red-400 ml-2">
              (Minimum 2 votes required)
            </span>
          )}
          {selectedVotes.length === 8 && (
            <span className="text-yellow-400 ml-2">
              (Maximum votes reached)
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 [&>:last-child:nth-child(3n+1)]:col-start-2 [&>:last-child:nth-child(3n+1)]:lg:col-start-2">
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
