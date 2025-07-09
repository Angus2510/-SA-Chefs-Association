"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface VoteAnalytics {
  candidateId: string;
  candidateName: string;
  voteCount: number;
  gautengVotes: number;
  westernCapeVotes: number;
  kznVotes: number;
  easternCapeVotes: number;
  freeStateVotes: number;
  limpopoVotes: number;
  mpumalangaVotes: number;
  northWestVotes: number;
  northernCapeVotes: number;
  professionalVotes: number;
  intermediateVotes: number;
  foreignBasedVotes: number;
}

interface VoteSummary {
  totalVotes: number;
  totalVoters: number;
  analyticsByCandidate: VoteAnalytics[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voteData, setVoteData] = useState<VoteSummary | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        toast.success("Login successful");
        loadVoteData();
      } else {
        const data = await response.json();
        toast.error(data.error || "Invalid password");
      }
    } catch (error) {
      toast.error("Login failed");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadVoteData = async () => {
    setLoadingData(true);
    try {
      const response = await fetch("/api/admin/vote-results");
      if (response.ok) {
        const data = await response.json();
        setVoteData(data);
      } else {
        toast.error("Failed to load vote data");
      }
    } catch (error) {
      toast.error("Failed to load vote data");
      console.error("Error loading vote data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const refreshData = () => {
    loadVoteData();
    toast.success("Data refreshed");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1b2942] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password" className="mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1b2942] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            SA Chefs Association - Voting Results Dashboard
          </h1>
          <div className="space-x-2">
            <Button onClick={refreshData} variant="outline">
              Refresh Data
            </Button>
            <Button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword("");
              }}
              variant="destructive"
            >
              Logout
            </Button>
          </div>
        </div>

        {loadingData ? (
          <div className="text-center text-white text-xl">
            Loading vote data...
          </div>
        ) : voteData ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Voters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {voteData.totalVoters}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Votes Cast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {voteData.totalVotes}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Candidate Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {voteData.analyticsByCandidate
                .sort((a, b) => b.voteCount - a.voteCount)
                .map((candidate) => (
                  <Card key={candidate.candidateId} className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {candidate.candidateName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-600">
                            {candidate.voteCount}
                          </div>
                          <div className="text-sm text-gray-600">
                            Total Votes
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">
                            Regional Breakdown:
                          </h4>
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            <div>Gauteng: {candidate.gautengVotes}</div>
                            <div>
                              Western Cape: {candidate.westernCapeVotes}
                            </div>
                            <div>KZN: {candidate.kznVotes}</div>
                            <div>
                              Eastern Cape: {candidate.easternCapeVotes}
                            </div>
                            <div>Free State: {candidate.freeStateVotes}</div>
                            <div>Limpopo: {candidate.limpopoVotes}</div>
                            <div>Mpumalanga: {candidate.mpumalangaVotes}</div>
                            <div>North West: {candidate.northWestVotes}</div>
                            <div>
                              Northern Cape: {candidate.northernCapeVotes}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">
                            Category Breakdown:
                          </h4>
                          <div className="text-xs space-y-1">
                            <div>
                              Professional: {candidate.professionalVotes}
                            </div>
                            <div>
                              Intermediate: {candidate.intermediateVotes}
                            </div>
                            <div>
                              Foreign-Based: {candidate.foreignBasedVotes}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-white text-xl">
            No vote data available
          </div>
        )}
      </div>
    </div>
  );
}
