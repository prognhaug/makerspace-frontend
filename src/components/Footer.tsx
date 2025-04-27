import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="font-poppins w-full bg-primary-warm text-text py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Brand Column */}
          <div>
            <div className="mb-4">
              <Image
                src="/logo.png"
                alt="Jæren Makerspace Logo"
                width={80}
                height={80}
                className="mb-2"
              />
              <h2 className="uppercase font-bold">
                Jæren
                <br />
                Makerspace
              </h2>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="uppercase font-medium hover:text-primary"
              >
                Hjem
              </Link>
              <Link
                href="/makerspace"
                className="uppercase font-medium hover:text-primary"
              >
                Makerspace
              </Link>
              <Link
                href="/arrangementer"
                className="uppercase font-medium hover:text-primary"
              >
                Events
              </Link>
              <Link
                href="/om-oss"
                className="uppercase font-medium hover:text-primary"
              >
                Om Oss
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="uppercase font-medium mb-2">Ta Kontakt</h3>
            <p className="mb-4">post@jarenmakerspace.no</p>
            <p>Sveinsvollveien 4,</p>
            <p>4340 Bryne</p>
            <p>Norway</p>
          </div>

          {/* Newsletter & Social Column */}
          <div>
            <h3 className="uppercase font-medium mb-3">Hold deg oppdatert</h3>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-6">
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors"
              >
                <Icon name="linkedin" size="lg" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-primary transition-colors"
              >
                <Icon name="instagram" size="lg" />
              </a>
              <a
                href="https://tiktok.com"
                aria-label="TikTok"
                className="hover:text-primary transition-colors"
              >
                <Icon name="tiktok" size="lg" />
              </a>
            </div>

            {/* Email Signup */}
            <div>
              <h3 className="uppercase font-medium mb-3">Meld interesse</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white px-4 py-2 rounded-l-md w-full focus:outline-none"
                />
                <button className="bg-white rounded-r-md px-3 hover:bg-primary-light transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm">
          <p>© 2025 www.jarenmakerspace.no All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
