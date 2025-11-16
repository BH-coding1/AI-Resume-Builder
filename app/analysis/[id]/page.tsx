// app/analysis/[id]/page.tsx
import { notFound } from "next/navigation";
import { Protect, RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/app/lib/mongodb";
import Resume from "@/models/Resume";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot, Layout, Palette, Target } from "lucide-react";


async function getResume(id: string) {
  await connectDB();
  const user = await currentUser();
  if (!user) return null;

  const doc = await Resume.findOne({ _id: id, userId: user.id });
  if (!doc) return null;


  return { ...doc, _id: doc._id.toString() };
}


export default async function AnalysisPage({ params }: { params: Promise<{ id: string }> }) { 
  const { id } = await params;  
  const resume = await getResume(id);  
  
  if (!resume) notFound();

  const {
    pdfUrl,
    jobTitle = "Position",
    companyName = "Company",
    scores = { tone_score: 0, structure_score: 0, skills_match_score: 0 },
    ats_score = { score: 0, justification: "" },
    optimization_suggestions = [],
  } = resume;

  const toneScore = scores.tone_score ?? 0;
  const structureScore = scores.structure_score ?? 0;
  const skillsScore = scores.skills_match_score ?? 0;
  const atsScore = ats_score.score ?? 0;
  const justification = ats_score.justification ?? "";
  const atsImprovements = optimization_suggestions;

  return (
    <Protect fallback={<RedirectToSignIn />}>
      <div className="min-h-screen bg-gradient-patches pt-30 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-5xl">

          {/* ---------- HERO SCORE ---------- */}
          <Card className="bg-white rounded-2xl border-gray-400 shadow-none p-8 mb-10">
            <CardHeader>
              <CardTitle className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-3 tracking-tight">
                Resume Score Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 text-lg mb-8">
                AI-powered analysis tailored for{" "}
                <span className="font-semibold text-primary">{jobTitle}</span> at{" "}
                <span className="font-semibold text-primary">{companyName}</span>
              </p>

              {/* Circle */}
              <div className="relative flex justify-center mb-8">
                <div className="relative w-48 h-48 overflow-hidden">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="#e5e7eb" strokeWidth="14" fill="none" />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="url(#gradient)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${(atsScore / 100) * 552} 552`}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#070085ff" />
                        <stop offset="70%" stopColor="#440196ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-gray-900">{atsScore}</span>
                    <span className="text-sm text-gray-500 mt-1">/100</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className={`text-lg font-medium ${atsScore >= 75 ? "text-primary-900" : atsScore >= 50 ? "text-primary-700" : "text-primary-600"}`}>
                  {atsScore >= 75 ? "Excellent fit" : atsScore >= 50 ? "Minor tweaks needed" : "Significant improvements required"}
                </p>
              </div>

              <p className="mt-4 text-center text-gray-600 italic">{justification}</p>
            </CardContent>
          </Card>

          {/* ---------- METRIC CARDS ---------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Tone & Style", score: toneScore, icon: <Palette /> },
              { label: "Structure", score: structureScore, icon: <Layout /> },
              { label: "Skills Match", score: skillsScore, icon: <Target /> },
              { label: "ATS Score", score: atsScore, icon: <Bot /> },
            ].map((m, i) => (
              <Card key={i} className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3 pt-5 px-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {m.icon}
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.score >= 80 ? "bg-emerald-100 text-emerald-700" : m.score >= 60 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                      {m.score >= 80 ? "Strong" : m.score >= 60 ? "Good" : "Improve"}
                    </span>
                  </div>
                  <CardTitle className="text-sm font-medium text-gray-700">{m.label}</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <p className="text-3xl font-bold text-gray-900">
                    {m.score}<span className="text-sm text-gray-500 font-medium">/100</span>
                  </p>
                  <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${m.score >= 80 ? "bg-emerald-500" : m.score >= 60 ? "bg-amber-500" : "bg-rose-500"}`}
                      style={{ width: `${m.score}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ---------- ATS SUGGESTIONS ---------- */}
          <Card className="bg-white rounded-xl border-gray-400 shadow-sm p-6 mb-10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                ATS Optimization Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {atsImprovements.map((s: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 group hover:from-amber-100 hover:to-orange-100 transition-all"
                  >
                    <span className="text-amber-600 font-semibold mr-3">•</span>
                    <p className="text-gray-700 group-hover:text-gray-900">{s}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ---------- RESUME PREVIEW ---------- */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="bg-primary-900 p-5 text-white">
              <CardTitle className="text-xl font-bold">
                Resume Preview: {companyName} - {jobTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gray-50">
              <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
                {pdfUrl ? (
                  <iframe src={pdfUrl} className="w-full h-96 rounded-md shadow-md" title="Resume PDF" />
                ) : (
                  <p className="text-center text-gray-500">No preview available.</p>
                )}
              </div>
            </CardContent>
          </Card>


          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              Analysis powered by{" "}
              <span className="font-semibold text-indigo-600">RefineAi</span>
            </p>
          </div>
        </div>
      </div>
    </Protect>
  );
}

