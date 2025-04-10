"use client";

import ProfileCard from "./profile-card";

interface ProfileCardDemoProps {
  selectedVotes: string[];
  setSelectedVotes: (votes: string[]) => void;
}

export default function ProfileCardDemo({
  selectedVotes,
  setSelectedVotes,
}: ProfileCardDemoProps) {
  const handleVote = (id: string) => {
    setSelectedVotes((prev) => {
      // If already selected, remove the vote
      if (prev.includes(id)) {
        return prev.filter((voteId) => voteId !== id);
      }
      // If not selected and less than 8 votes, add the vote
      if (prev.length < 8) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const candidates = [
    {
      id: "1",
      name: "Alex Johnson",
      bio: "Suzan is the principal of Limpopo Chefs Academy, located in Polokwane, South Africa. She has extensive experience in higher education, with skills in research, management, and teaching. In 2019, she became one of the first qualified artisan chefs, a milestone celebrated by the academy. Under her leadership, the academy has provided significant experience and exposure to its students, contributing to the culinary field in the region.",
      imageUrl: "/chef-1.jpg",
    },
    {
      id: "2",
      name: "Sam Rivera",
      bio: "John is the principal of Limpopo Chefs Academy, located in Polokwane, South Africa. He has extensive experience in higher education, with skills in research, management, and teaching. In 2019, he became one of the first qualified artisan chefs, a milestone celebrated by the academy. Under his leadership, the academy has provided significant experience and exposure to its students, contributing to the culinary field in the region.",
      imageUrl: "/chef-2.jpg",
    },
    {
      id: "3",
      name: "Taylor Kim",
      bio: "Healthcare professional with expertise in public health policy. Advocate for accessible healthcare and mental health services.",
      imageUrl: "/chef-3.jpg",
    },
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
