"use client"

import { useState } from "react"
import Image from "next/image"
import { ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface ProfileCardProps {
  name: string
  bio: string
  imageUrl: string
  id: string
  onVote?: (id: string) => void
}

export default function ProfileCard({
  name = "Jane Doe",
  bio = "Product designer with 5+ years of experience in creating user-centered digital products. Passionate about solving complex problems with simple solutions.",
  imageUrl = "/placeholder.svg?height=200&width=400",
  id = "1",
  onVote = () => {},
}: ProfileCardProps) {
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = () => {
    if (!hasVoted) {
      setHasVoted(true)
      onVote(id)
    }
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={imageUrl || "/placeholder.svg"} alt={`Photo of ${name}`} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-sm text-gray-600">{bio}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button onClick={handleVote} className="w-full" disabled={hasVoted} variant={hasVoted ? "outline" : "default"}>
          <ThumbsUp className="mr-2 h-4 w-4" />
          {hasVoted ? "Vote Cast" : "Cast Vote"}
        </Button>
      </CardFooter>
    </Card>
  )
}
