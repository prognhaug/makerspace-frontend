import Icon from "@/components/ui/Icon";

export default function Footer() {
  return (
    <footer className="font-poppins w-full bg-primary-light text-text py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Jæren Makerspace</h2>
            <p>Lagegaten 1337</p>
            <p>4352 Creativetown</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 mt-4 md:mt-0">
              Kontakt oss
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://linkedin.com"
                className="text-text hover:text-primary transition-colors"
              >
                <Icon name="linkedin" size="lg" />
              </a>
              <a
                href="https://instagram.com"
                className="text-text hover:text-primary transition-colors"
              >
                <Icon name="instagram" size="lg" />
              </a>
              <a
                href="https://tiktok.com"
                className="text-text hover:text-primary transition-colors"
              >
                <Icon name="tiktok" size="lg" />
              </a>
              <a
                href="mailto:kontakt@jarenmakerspace.no"
                className="text-text hover:text-primary transition-colors"
              >
                <Icon name="mail" size="lg" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-primary-light text-center text-sm">
          <p>
            © {new Date().getFullYear()} Jæren Makerspace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
