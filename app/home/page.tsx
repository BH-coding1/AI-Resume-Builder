"use client";

import ResumeCard from "@/components/resumeCard";
import { Protect, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

// === Types ===
interface Scores {
  tone_score: number;
  structure_score: number;
  skills_match_score: number;
}

interface AtsScore {
  score: number;
  justification: string;
}

interface ResponseData {
  pdfUrl: string;
  scores: Scores;
  ats_score: AtsScore;
  resume_analysis: string[];
  companyName: string;
  jobTitle: string;
  optimization_suggestions: string[];
  _id: string;
}

async function fetchResumes(): Promise<ResponseData[]> {
  try {
    const response = await fetch(`/api/resumes`, {
      method: "GET",
      credentials: "include",
    });
    if (!response) {
      return [];
    }
    if (!response.ok) {
      throw new Error("Failed to fetch resumes");
    }

    return response.json();
  } catch (err: any) {
    throw new Error(err);
  }
}

const Homepage = () => {
  const [resumes, setResumes] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        setLoading(true);
        const data = await fetchResumes();
        if (!data) {
          setError("No Resumes yet press Upload Resume");
        }
        setResumes(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching resumes:", err);
        setError("Failed to load resumes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadResumes();
  }, []);

  return (
    <Protect fallback={<RedirectToSignIn />}>
      <div className="text-center">
        <h1 className="text-6xl font-extrabold tracking-tight bg-gray-900 text-transparent bg-clip-text">
          Analysed résumés homepage
        </h1>
        <p className="mt-5 text-lg sm:text-xl text-gray-500 text-base">
          Click and view your résumé to view the analysis and personalized tips
        </p>
      </div>
      <div className="py-30 bg-gray-50 min-h-screen bg-gradient-patches px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-600">Loading your resumes...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-10">
              <p className="text-red-600">{error}</p>
            </div>
          ) : resumes.length > 0 ? (
            resumes.map((resume, index) => (
              <Link key={resume._id} href={`analysis/${resume._id}`}>
                <ResumeCard
                  key={index}
                  title={resume.jobTitle}
                  companyName={resume.companyName}
                  atsScore={resume.ats_score.score}
                  imageUrl={resume.pdfUrl}
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-600">No resumes found.</p>
            </div>
          )}
        </div>
      </div>
    </Protect>
  );
};

export default Homepage;
