import data from "@/data.json";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

export default function CountryDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);

  //   const nameParam = params?.name;

  const country = data.find(
    (c) => c.numericCode.toLowerCase() === name.toLowerCase()
  );

  if (!country) {
    return <div className="text-center mt-10">Country not found.</div>;
  }

  return (
    <main className="flex flex-col items-start w-full min-h-screen dark:bg-blue-950 p-8">
      <Link
        href="/"
        className="my-12 px-4 py-2 rounded dark:bg-blue-900 dark:text-white flex items-center gap-2 shadow-2xl hover:bg-blue-950 transition-colors"
      >
        <span aria-hidden="true">←</span> Back
      </Link>
      <div className="grid md:grid-cols-2 gap-16 w-full">
        <div className="flex-1 flex items-center justify-center p-4 rounded-xl bg-white border dark:bg-blue-950/90">
          <Image
            src={country.flags.png}
            alt={country.name}
            width={480}
            height={320}
            className="w-full h-auto rounded shadow"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6">{country.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <p>
                <span className="font-semibold">Native Name:</span>{" "}
                {country.nativeName}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.topLevelDomain?.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {country.currencies?.map((c) => c.name).join(", ")}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {country.languages?.map((l) => l.name).join(", ")}
              </p>
            </div>
          </div>
          {country.borders && country.borders.length > 0 && (
            <div className="mt-4">
              <span className="font-semibold">Border Countries:</span>{" "}
              {country.borders.map((border) => {
                const borderCountry = data.find((c) => c.alpha3Code === border);
                return borderCountry ? (
                  <Link
                    key={border}
                    href={`/${encodeURIComponent(borderCountry.name)}`}
                    className="inline-block px-3 py-1 m-1 rounded bg-blue-900 text-white text-sm shadow hover:bg-blue-950 transition-colors"
                  >
                    {borderCountry.name}
                  </Link>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
