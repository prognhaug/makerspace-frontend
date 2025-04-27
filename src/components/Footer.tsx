export default function Footer() {
  return (
    <footer className="font-poppins w-full bg-primary-faint text-text py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Makerspace</h2>
            <p>Lagegaten 1337</p>
            <p>4352 Creativetown</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 mt-4 md:mt-0">
              Kontakt oss
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300">
                Twitter
              </a>
              <a href="#" className="hover:text-blue-300">
                Facebook
              </a>
              <a href="#" className="hover:text-blue-300">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm">
          <p>© 2025 Jæren Makerspace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
