import React from "react";

const HowItWorks = () => {
  return (
    <div className="flex mx-5  rounded-2xl items-center text-gray-900 justify-center mb-25 mt-10 bg-primary-50">
      <div className="max-w-(--breakpoint-xl) mx-auto py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter">
          How it works?
        </h2>
        <p className="mt-4 text-xl text-muted-foreground text-wrap">
          Our AI-powered resume fixer enhances your resume, making it more professional and tailored to impress employers.
        </p>

        <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 justify-center">
          <div className="max-w-3xs">
            <span className="text-5xl font-semibold">96%</span>
            <p className="mt-6 text-lg">
              of users report a more polished and professional resume
            </p>
          </div>
          <div className="max-w-3xs">
            <span className="text-5xl font-semibold">95%</span>
            <p className="mt-6 text-lg">
              of users find it easier to customize their resume for job applications
            </p>
          </div>
          <div className="max-w-3xs">
            <span className="text-5xl font-semibold">87%</span>
            <p className="mt-6 text-lg">
              of users say their resume better highlights their skills and experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
