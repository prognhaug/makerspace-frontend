import React from "react";
import Link from "next/link";

export default function Events() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Arrangementer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Her vil du finne alle kommende arrangementer ved vårt makerspace.
          </p>
        </div>

        {/* Placeholder for when there are no events */}
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">
            Ingen arrangementer er planlagt for øyeblikket.
          </p>
          <p className="text-gray-600">
            Kom tilbake senere, eller{" "}
            <Link href="/kontakt" className="text-blue-600 hover:text-blue-500">
              kontakt oss
            </Link>{" "}
            for mer informasjon.
          </p>
        </div>
      </div>
    </div>
  );
}
