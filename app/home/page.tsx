'use client'; // Required for useEffect, useState

import ResumeCard from "@/components/resumeCard";
import { Protect, RedirectToSignIn } from "@clerk/nextjs";
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
}


async function fetchResumes(): Promise<ResponseData[]> {
  const response = await fetch(`/api/resumes`, {
    method: "GET",
    credentials: "include", 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch resumes");
  }

  return response.json();
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
      <div className="py-30 bg-gray-50 min-h-screen px-10">
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
              <ResumeCard
                key={index}
                title={resume.jobTitle}
                companyName={resume.companyName}
                atsScore={resume.ats_score.score}
                imageUrl='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.beamjobs.com%2Fresumes%2Fit-resume-examples&psig=AOvVaw1sT4FjKWLxaviNJIIO0y65&ust=1762888430293000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCJiLjrGl6JADFQAAAAAdAAAAABAK'
              />
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