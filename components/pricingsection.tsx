import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/app/lib/utils";
import { CircleCheck } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 19,
    description:
      "Polish up to 3 resumes with AI-driven enhancements and 2 professional templates.",
    features: [
      "24-hour processing time",
      "3 resume revisions",
      "Basic ATS optimization",
      "1 feedback session",
    ],
    buttonText: "Enhance 3 resumes in 24 hours",
  },
  {
    name: "Advanced",
    price: 29,
    isRecommended: true,
    description:
      "Refine up to 10 resumes with 5 professional templates and advanced AI tools.",
    features: [
      "12-hour processing time",
      "10 resume revisions",
      "Advanced ATS optimization",
      "3 feedback sessions",
    ],
    buttonText: "Refine 10 resumes in 12 hours",
    isPopular: true,
  },
  {
    name: "Premium",
    price: 49,
    description:
      "Perfect up to 25 resumes with 10 professional templates and premium AI features.",
    features: [
      "6-hour processing time",
      "25 resume revisions",
      "Premium ATS optimization",
      "5 feedback sessions",
    ],
    buttonText: "Perfect 25 resumes in 6 hours",
  },
];

const Pricing = () => {
  return (
    <div
      id="pricing"
      className="min-h-screen bg-white pb-30 pt-20 mx-5 rounded-2xl text-gray-900 flex mb-20 mt-35 flex-col items-center justify-center py-12 px-6"
    >
      <h1 className="text-5xl sm:text-6xl font-semibold text-center tracking-tighter">
        Pricing Plans
      </h1>
      <div className="mt-12 sm:mt-16 max-w-(--breakpoint-lg) mx-auto grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn("relative border rounded-lg p-6", {
              "border-2 border-primary py-10": plan.isPopular,
            })}
          >
            {plan.isPopular && (
              <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                Most Popular
              </Badge>
            )}
            <h3 className="text-lg font-medium">{plan.name}</h3>
            <p className="mt-2 text-4xl font-bold">${plan.price}</p>
            <p className="mt-4 font-medium text-muted-foreground">
              {plan.description}
            </p>
            <Separator className="my-4" />
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CircleCheck className="h-4 w-4 mt-1 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.isPopular ? "default" : "outline"}
              size="lg"
              className="w-full mt-6"
            >
              {plan.buttonText}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
