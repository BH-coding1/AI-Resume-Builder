// app/components/AnalysisDropdowns.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type AnalysisData = {
  tone_score?: number;
  structure_score?: number;
  skills_match_score?: number;
  tone_analysis?: string[];
  structure_analysis?: string[];
  skills_match_analysis?: string[];
};

interface Props {
  data: AnalysisData;
}

const getScoreColor = (score: number) => {
  if (score >= 85) return "bg-emerald-600";
  if (score >= 70) return "bg-green-600";
  if (score >= 50) return "bg-amber-600";
  return "bg-rose-600";
};

const getScoreLabel = (score: number) => {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Needs Work";
  return "Critical";
};

export default function AnalysisDropdowns({ data }: Props) {
  const toneScore = data.tone_score ?? 0;
  const structureScore = data.structure_score ?? 0;
  const skillsScore = data.skills_match_score ?? 0;

  const tonePoints = data.tone_analysis?.filter(Boolean) || ["No tone analysis available."];
  const structurePoints = data.structure_analysis?.filter(Boolean) || ["No structure feedback."];
  const skillsPoints = data.skills_match_analysis?.filter(Boolean) || ["No skills analysis available."];

  return (
    <div className="w-full border p-4 rounded-xl border-gray-400  mx-auto mt-16 mb-24">
        

      <Accordion type="single" collapsible className="space-y-6">
        {/* TONE & PROFESSIONALISM */}
        <AccordionItem value="tone" className="border-0 rounded-2xl overflow-hidden shadow-lg bg-white">
          <AccordionTrigger className="px-8 py-6 hover:no-underline bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-2xl hover:from-purple-600 hover:to-purple-700 transition-all">
            <div className="flex items-center justify-between w-full">
              <div className="text-left">
                <p className="text-2xl font-bold">Tone & Professionalism</p>
                <p className="text-purple-100 text-sm mt-1">How your voice comes across</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="text-lg px-4 py-1 bg-white text-purple-700 font-bold">
                  {toneScore}/100
                </Badge>
                <span className="text-sm font-semibold text-purple-100">
                  {getScoreLabel(toneScore)}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-8 py-7 bg-gradient-to-b from-purple-50 to-purple-100 border-t-4 border-purple-300">
            <ul className="space-y-3  text-lg text-gray-800">
              {tonePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* STRUCTURE & CLARITY */}
        <AccordionItem value="structure" className="border-0 rounded-2xl overflow-hidden shadow-lg bg-white">
          <AccordionTrigger className="px-8 py-6 hover:no-underline bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all">
            <div className="flex items-center justify-between w-full">
              <div className="text-left">
                <p className="text-2xl font-bold">Structure & Clarity</p>
                <p className="text-blue-100 text-sm mt-1">How well-organized and readable it is</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="text-lg px-4 py-1 bg-white text-blue-700 font-bold">
                  {structureScore}/100
                </Badge>
                <span className="text-sm font-semibold text-blue-100">
                  {getScoreLabel(structureScore)}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-8 py-7 bg-gradient-to-b from-blue-50 to-blue-100 border-t-4 border-blue-300">
            <ul className="space-y-3 text-lg text-gray-800">
              {structurePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* SKILLS MATCH */}
        <AccordionItem value="skills" className="border-0 rounded-2xl overflow-hidden shadow-lg bg-white">
          <AccordionTrigger className="px-8 py-6 hover:no-underline bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-b-2xl hover:from-green-600 hover:to-emerald-700 transition-all">
            <div className="flex items-center justify-between w-full">
              <div className="text-left">
                <p className="text-2xl font-bold">Skills Match</p>
                <p className="text-green-100 text-sm mt-1">How well your skills align with the job</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="text-lg px-4 py-1 bg-white text-green-700 font-bold">
                  {skillsScore}/100
                </Badge>
                <span className="text-sm font-semibold text-green-100">
                  {getScoreLabel(skillsScore)}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-8 py-7 bg-gradient-to-b from-green-50 to-emerald-100 border-t-4 border-emerald-300">
            <ul className="space-y-3 text-lg text-gray-800">
              {skillsPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-emerald-600 font-bold mt-1">•</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      
    
    </div>
  );
}