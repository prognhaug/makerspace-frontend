"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`font-poppins w-full text-default py-4 ${
        isHomePage ? "bg-secondary-beige" : "bg-primary-faint"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Jæren Makerspace logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="text-size-h3 font-bold uppercase">
              Jæren Makerspace
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <NavLink href="/">Hjem</NavLink>
              <NavLink href="/makerspace">Makerspace</NavLink>
              <NavLink href="/arrangementer">Events</NavLink>
              <NavLink href="/om-oss">Om oss</NavLink>
              <NavLink href="/meld-interesse">Meld interesse</NavLink>
              <li>
                <Link href="/ta-kontakt" className="inline-block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer w-[120.44px] h-[34.66px] px-0"
                  >
                    Ta kontakt
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/admin/rediger" className="inline-block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer w-[120.44px] h-[34.66px] px-0"
                  >
                    Rediger
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-default focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <>
            {/* Navigation panel */}
            <nav className="fixed top-[72px] left-4 right-4 bg-white rounded-lg shadow-lg p-4 space-y-3 z-50 max-h-[80vh] overflow-y-auto">
              <MobileLink href="/" setMenuOpen={setMenuOpen}>
                Hjem
              </MobileLink>
              <MobileLink href="/makerspace" setMenuOpen={setMenuOpen}>
                Makerspace
              </MobileLink>
              <MobileLink href="/arrangementer" setMenuOpen={setMenuOpen}>
                Events
              </MobileLink>
              <MobileLink href="/om-oss" setMenuOpen={setMenuOpen}>
                Om oss
              </MobileLink>
              <MobileLink href="/meld-interesse" setMenuOpen={setMenuOpen}>
                Meld interesse
              </MobileLink>
              <div className="pt-2">
                <Link
                  href="/ta-kontakt"
                  onClick={() => setMenuOpen(false)}
                  className="block mb-3"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    Ta kontakt
                  </Button>
                </Link>
                <Link
                  href="/admin/rediger"
                  onClick={() => setMenuOpen(false)}
                  className="block"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    Rediger
                  </Button>
                </Link>
              </div>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`hover:text-primary relative py-1 ${
          isActive
            ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-text"
            : ""
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

function MobileLink({
  href,
  children,
  setMenuOpen,
}: {
  href: string;
  children: React.ReactNode;
  setMenuOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className={`block py-2 text-base font-medium text-default hover:text-primary ${
        isActive ? "font-bold" : ""
      }`}
    >
      {children}
    </Link>
  );
}
