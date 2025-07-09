"use client";

import Image from "next/image";
import { ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileCardProps {
  name: string;
  bio: string;
  imageUrl: string;
  id: string;
  onVote: (id: string) => void;
  isSelected: boolean;
}

export default function ProfileCard({
  name = "Jane Doe",
  bio = "Product designer with 5+ years of experience in creating user-centered digital products. Passionate about solving complex problems with simple solutions.",
  imageUrl = "/placeholder.svg?height=200&width=400",
  id = "1",
  onVote,
  isSelected,
}: ProfileCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden h-[500px] flex flex-col">
      <CardHeader className="p-0 flex-shrink-0">
        <div className="relative h-48 w-full bg-gray-100">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`Photo of ${name}`}
            fill
            className="object-contain"
          />
        </div>
        <div className="px-6 py-2">
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
      </CardHeader>
      <CardContent className="px-6 pt-0 pb-1 flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 min-h-0">
          <p className="text-sm text-gray-600 pr-4">
            {bio || "Bio not available yet."}
          </p>
        </ScrollArea>
      </CardContent>
      <CardFooter className="px-6 py-3 flex-shrink-0">
        <Button
          onClick={() => onVote(id)}
          className="w-full"
          variant={isSelected ? "outline" : "default"}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          {isSelected ? "Remove Vote" : "Cast Vote"}
        </Button>
      </CardFooter>
    </Card>
  );
}
