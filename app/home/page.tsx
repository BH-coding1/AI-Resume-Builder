import ResumeCard from "@/components/resumeCard";
import React from "react";
import { Protect ,RedirectToSignIn} from "@clerk/nextjs";

const Homepage = () => {
  return (
    <Protect fallback={<RedirectToSignIn />}>
      <div className="py-30 bg-gray-50 min-h-screen px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mb-8">
          <ResumeCard
            title="Software Engineer Resume"
            companyName="TechCorp Inc."
            atsScore={85}
            imageUrl="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freesumes.com%2Ffree-resume-templates-for-ms-word%2F&psig=AOvVaw2fXW8vzV6had7Neue6VVVp&ust=1762012854036000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNDOzcnnzpADFQAAAAAdAAAAABAE" // Replace with actual image URL
          />

          <ResumeCard
            title="Software Engineer Resume"
            companyName="TechCorp Inc."
            atsScore={85}
            imageUrl="https://via.placeholder.com/400x300" // Replace with actual image URL
          />
        </div>
      </div>
    </Protect>
  );
};

export default Homepage;
