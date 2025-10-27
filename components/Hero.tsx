import { Button } from "@/components/ui/button";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  imageSrc?: string;
  imageAlt?: string;
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const Hero = ({
  heading = "Elevate Your Resume with AI-Powered Precision",
  description = "Transform your resume with expertly crafted content using AI, Tailwind, and Shadcn UI. Copy and paste professional templates to stand out in your job search.",
  button = {
    text: "Import Resume",
    url:'/'
  },
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  imageAlt = "placeholder",
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
}: Hero7Props) => {
  return (
    <section className="py-32 mt-16  ">
      <div className="container text-center pb-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <h1 className="text-3xl font-semibold lg:text-7xl">{heading}</h1>
          <p className="text-muted-foreground text-balance lg:text-lg">
            {description}
          </p>
        </div>
        <Button asChild  className="mt-10 rounded-xl px-10 py-5">
          <a href={button.url}>{button.text}</a>
        </Button>
      </div>
      <div className="mt-30 flex flex-col px-5">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="mx-auto h-full max-h-[524px] w-full max-w-5xl rounded-2xl object-cover"
        />
      </div>
    </section>
  );
};

export { Hero };
