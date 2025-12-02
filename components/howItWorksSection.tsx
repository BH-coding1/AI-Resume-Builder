import { BadgeCheck, Crosshair, Sparkles, Target } from "lucide-react";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="flex mx-5  rounded-2xl items-center text-gray-900 justify-center mb-25 mt-10 bg-primary-50">
      <div className="max-w-(--breakpoint-xl) mx-auto py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">
          How it works?
        </h2>
        <p className="mt-4 text-xl text-muted-foreground text-wrap">
          Our AI-powered resume analysis analyses your resume, making it more
          professional and tailored to impress employers.
        </p>

        <div className="mt-10 sm:mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {/* Block 1 */}
          <div className="max-w-3xs p-6 rounded-2xl  border border-zinc-800">
            <span className="text-5xl font-semibold justify-center flex items-center gap-3">
              <Target className="w-12 h-12 justify-center" />
            </span>
            <p className="mt-6 text-lg">More accurate resume ATS score</p>
          </div>

          {/* Block 2 */}
          <div className="max-w-3xs p-6 rounded-2xl border border-zinc-800">
            <span className="text-5xl font-semibold justify-center flex items-center gap-3">
              <Sparkles className="w-12 h-12 justify-center" />

            </span>
            <p className="mt-6 text-lg">
              Easier to improve resume for job applications
            </p>
          </div>

          {/* Block 3 */}
          <div className="max-w-3xs p-6 rounded-2xl  border border-zinc-800">
            <span className="text-5xl font-semibold justify-center flex items-center gap-3">
              <BadgeCheck className="w-12 h-12 justify-center" />
    
            </span>
            <p className="mt-6 text-lg">
              Better highlights skills and experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
