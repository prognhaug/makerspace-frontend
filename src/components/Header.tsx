"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header
      className={`font-poppins w-full text-text py-4 ${
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

          <nav>
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
        </div>
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
