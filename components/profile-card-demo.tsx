"use client";

import ProfileCard from "./profile-card";

export default function ProfileCardDemo() {
  const handleVote = (id: string) => {
    console.log(`Voted for candidate with ID: ${id}`);
    // Here you would typically send the vote to your backend
  };

  const candidates = [
    {
      id: "1",
      name: "Alex Johnson",
      bio: "Suzan is the principal of Limpopo Chefs Academy, located in Polokwane, South Africa. He has extensive experience in higher education, with skills in research, management, and teaching. In 2019, he became one of the first qualified artisan chefs, a milestone celebrated by the academy. Under his leadership, the academy has provided significant experience and exposure to its students, contributing to the culinary field in the region.",
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {candidates.map((candidate) => (
        <ProfileCard
          key={candidate.id}
          id={candidate.id}
          name={candidate.name}
          bio={candidate.bio}
          imageUrl={candidate.imageUrl}
          onVote={handleVote}
        />
      ))}
    </div>
  );
}
