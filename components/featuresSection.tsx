import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
 {
    category: "Resume Analysis",
    title: "Instantly Optimize Your Resume",
    details:
      "Our AI scans your resume and provides tailored suggestions to enhance clarity and impact. Highlight your strengths with precise, professional wording.",
    tutorialLink: "#",
  },
  {
    category: "Template Customization",
    title: "Craft Resumes with Ease",
    details:
      "Choose from professional templates and customize them effortlessly. Our AI guides you to create job-specific resumes that stand out to recruiters.",
    tutorialLink: "#",
  },
  {
    category: "Skill Enhancement",
    title: "Showcase Your Best Skills",
    details:
      "Identify and emphasize key skills with AI-driven insights. Automatically rephrase and organize your experience to align with job requirements.",
    tutorialLink: "#",
  },
  {
    category: "Job Match Optimization",
    title: "Tailor for Your Dream Job",
    details:
      "Align your resume with job descriptions using AI-powered keyword optimization. Increase your chances of passing applicant tracking systems (ATS).",
    tutorialLink: "#",
  },
  {
    category: "Feedback Integration",
    title: "Refine with Real-Time Feedback",
    details:
      "Get instant feedback on your resume’s structure and content. Collaborate with our AI to refine sections and ensure a polished, professional output.",
    tutorialLink: "#",
  },
];

const Features = () => {
  return (
    <div id='features' className="mt-30 text-gray-900 mb-5 bg-primary text-white flex pb-10 items-center justify-center">
      <div className="max-w-(--breakpoint-lg) w-full py-10 px-6">
        <h2 className="text-4xl md:text-[2.75rem] md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl text-pretty sm:mx-auto sm:text-center">
          Strengthen Your Strategy
        </h2>
        <p className="mt-2 text-gray-100 text-lg sm:text-xl sm:text-center">
          Enhance your strategy with intelligent tools designed for success.
        </p>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => (
            <div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse"
            >
              <div className="w-full aspect-[4/3] bg-muted rounded-xl border border-border/50 basis-1/2" />
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-medium text-sm text-gray-50">
                  {feature.category}
                </span>
                <h4 className="my-3 text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-gray-300">{feature.details}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
