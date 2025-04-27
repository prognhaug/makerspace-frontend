import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary-beige">
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
              Jæren
              <br />
              Makerspace
            </h1>

            <p className="font-work-sans text-p1">
              Vi i Jæren Makerspace gleder oss til å åpne dørene. Vi ønsker å
              skape et inkluderende og kreativt samlingspunkt for teknologi,
              håndverk og læring. Gjennom våren vil vi dele spennende nyheter,
              arrangementer og glimt av alt som venter. Følg med!
            </p>

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

      {/* Kom til oss! Section */}
      <div className="w-full bg-primary-faint py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column with Text */}
            <div className="flex flex-col space-y-6 text-text">
              <h2 className="font-poppins text-3xl font-bold">Kom til oss!</h2>

              <p className="font-work-sans">
                Vi vet at mange sitter med ideer, prosjekter og drømmer – men
                kanskje uten riktig utstyr, plass eller fellesskap rundt seg.
                Det ønsker vi å gjøre noe med. Enten du er nysgjerrig på søm,
                vil lære deg 3D-modellering, bygge roboter, kutte vinyl, eller
                bare har lyst til å dykke inn i et nytt fagfelt. Hos oss finner
                du både verksteyne og menneskene som heier på deg!
              </p>

              <p className="font-work-sans">
                Har du alltid hatt lyst til å bygge noe, men mangler garasje,
                hobbyrom eller verkstøy hjemme? Kom til oss, da vel.
              </p>
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
    </div>
  );
}
