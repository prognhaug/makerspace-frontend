import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface StaticHeroProps {
  title: string;
  subtitle: string;
  description: string;
  imagePath?: string;
  imageAlt?: string;
}

export default function StaticHero({
  title,
  subtitle,
  description,
  imagePath = "/pictures/hero.png",
  imageAlt = "Jæren Makerspace",
}: StaticHeroProps) {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center md:justify-start">
          <Image
            src={imagePath}
            alt={imageAlt}
            width={500}
            height={500}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col space-y-8 text-default">
          <h1 className="font-poppins text-4xl md:text-5xl font-bold">
            {title}
          </h1>
          <h2 className="font-poppins text-2xl md:text-3xl">{subtitle}</h2>
          <p className="font-work-sans">{description}</p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/meld-interesse">
              <Button
                variant="default"
                size="md"
                className="bg-primary-brown text-white hover:bg-primary-brown/90"
              >
                Meld interesse
              </Button>
            </Link>

            <Link href="/ta-kontakt">
              <Button variant="outline" size="md">
                Ta kontakt
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
