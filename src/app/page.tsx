import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Suspense } from "react";

interface Section {
  id: string;
  title: string;
  content: string;
}

async function PageContent() {
  // Fetch content from the API
  let content;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/admin/mock`,
      {
        next: { revalidate: 5 }, // Revalidate every 5 secs
      }
    );

    if (!res.ok) throw new Error("Failed to fetch content");
    content = await res.json();
  } catch (error) {
    console.error("Error fetching page content:", error);
    // Use default content if API fails
    content = getDefaultContent();
  }

  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column with Illustration */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/pictures/textile1.png"
              alt="Jæren Makerspace illustration"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </div>

          {/* Right Column with Text and Buttons */}
          <div className="flex flex-col space-y-8 text-text">
            <h1 className="font-poppins text-5xl font-bold uppercase">
              {content.hero.title}
            </h1>

            <p className="font-work-sans text-p1">{content.hero.description}</p>

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

      {/* Display each section */}
      {content.sections.map((section: Section) => (
        <div key={section.id} className="w-full bg-primary-faint py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column with Text */}
              <div className="flex flex-col space-y-6 text-text">
                <h2 className="font-poppins text-3xl font-bold">
                  {section.title}
                </h2>
                <p className="font-work-sans">{section.content}</p>
              </div>

              {/* Right Column with Image */}
              <div className="flex justify-center md:justify-end">
                <Image
                  src="/pictures/textile2.png"
                  alt="Workshop at Jæren Makerspace"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// Default content as fallback
function getDefaultContent() {
  return {
    hero: {
      title: "Jæren Makerspace",
      subtitle: "Et fellesskap for skapende mennesker",
      description:
        "Vi i Jæren Makerspace gleder oss til å åpne dørene. Vi ønsker å skape et inkluderende og kreativt samlingspunkt for teknologi, håndverk og læring. Gjennom våren vil vi dele spennende nyheter, arrangementer og glimt av alt som venter. Følg med!",
    },
    sections: [
      {
        id: "about",
        title: "Kom til oss!",
        content:
          "Vi vet at mange sitter med ideer, prosjekter og drømmer – men kanskje uten riktig utstyr, plass eller fellesskap rundt seg. Det ønsker vi å gjøre noe med. Enten du er nysgjerrig på søm, vil lære deg 3D-modellering, bygge roboter, kutte vinyl, eller bare har lyst til å dykke inn i et nytt fagfelt. Hos oss finner du både verksteyne og menneskene som heier på deg!",
      },
    ],
  };
}

// Fallback component to show while loading
function LoadingContent() {
  return (
    <>
      {/* Hero Section with loading state */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <div className="bg-gray-200 animate-pulse w-[500px] h-[500px]"></div>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="bg-gray-200 animate-pulse h-12 w-2/3"></div>
            <div className="bg-gray-200 animate-pulse h-24 w-full"></div>
            <div className="flex gap-4 pt-4">
              <div className="bg-gray-200 animate-pulse h-12 w-32"></div>
              <div className="bg-gray-200 animate-pulse h-12 w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary-beige">
      <Suspense fallback={<LoadingContent />}>
        <PageContent />
      </Suspense>
    </div>
  );
}
