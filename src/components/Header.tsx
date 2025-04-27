import Link from "next/link";
import Button from "@/components/ui/Button"; // Import the Button component

export default function Header() {
  return (
    <header className="font-poppins w-full bg-primary-faint text-text py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            JÆREN MAKERSPACE
          </Link>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link href="/">Hjem</Link>
              </li>
              <li>
                <Link href="/makerspace">Makerspace</Link>
              </li>
              <li>
                <Link href="/arrangementer">Arrangementer</Link>
              </li>
              <li>
                <Link href="/om-oss">Om oss</Link>
              </li>
              <li>
                <Link href="/meld-interesse">Meld interesse</Link>
              </li>
              <li>
                <Link href="/ta-kontakt" className="inline-block">
                  <Button
                    variant="default"
                    size="sm"
                    className="cursor-pointer"
                  >
                    Ta kontakt
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
