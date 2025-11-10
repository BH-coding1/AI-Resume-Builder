import ResumeCard from "@/components/resumeCard";
import { Protect, RedirectToSignIn } from "@clerk/nextjs";

// Define interfaces
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
  companyName:string;
  jobTitle:string;
  optimization_suggestions: string[];
}

// Mark as async server component
async function fetchResumes(): Promise<ResponseData[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/analysis`, {
    method: "GET",
    cache: "no-store", // or use revalidate if needed
  });

  if (!response.ok) {
    throw new Error("Failed to fetch resumes");
  }

  return response.json();
}

const Homepage = async () => {
  let resumes: ResponseData[] = [];

  try {
    resumes = await fetchResumes();
  } catch (error) {
    console.error("Error fetching resumes:", error);
  }

  return (
    <Protect fallback={<RedirectToSignIn />}>
      <div className="py-30 bg-gray-50 min-h-screen px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {resumes.length > 0 ? (
            resumes.map((resume, index) => (
              <ResumeCard
                key={resume.pdfUrl || index} 
                title="Software Engineer Resume"
                companyName="TechCorp Inc."
                atsScore={resume.ats_score.score}
                imageUrl={resume.pdfUrl}
              />
            ))
          ) : (
            <p>No resumes found.</p>
          )}
        </div>
      </div>
    </Protect>
  );
};

export default Homepage;