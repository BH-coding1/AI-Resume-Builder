import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "How does the resume analysis work?",
    answer:
      "Your PDF is scanned with AI and ATS-style parsing to detect weak areas, missing keywords, formatting issues, and clarity problems. You immediately receive a breakdown and improvement suggestions.",
  },
  {
    question: "Is my resume data stored or shared?",
    answer:
      "Your resume is processed securely and only used to generate your results. We don’t sell, share, or permanently store your content.",
  },
  {
    question: "Does this improve my ATS score?",
    answer:
      "Yes. The system analyses sections, formatting, and relevant job-specific keywords to increase your chances of passing ATS filters.",
  },
  {
    question: "Can I upload multiple resumes?",
    answer:
      "Absolutely. You can upload and analyze as many resumes as you like for different job positions.",
  },
  {
    question: "What file types do you support?",
    answer:
      "We currently support PDF uploads, which ensures consistent formatting across different devices and ATS systems.",
  },
];


const FAQ = () => {
  return (
    <div id='FAQ' className="min-h-screen flex items-center text-gray-800 justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row items-start gap-x-12 gap-y-6">
        <h2 className="text-4xl lg:text-5xl leading-[1.15]! font-semibold tracking-tighter">
          Frequently Asked <br /> Questions
        </h2>

        <Accordion type="single" defaultValue="question-0" className="max-w-xl">
          {faq.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
