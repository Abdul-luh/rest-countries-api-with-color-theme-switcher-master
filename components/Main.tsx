// Main.tsx
"use client";
import React, { useState } from "react";
import Search from "./Search";
import data from "@/data.json";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");

  const filteredData = data.filter((country) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      country.name.toLowerCase().includes(term) ||
      country.region.toLowerCase().includes(term) ||
      country.subregion?.toLowerCase().includes(term) ||
      country.capital?.toLowerCase().includes(term) ||
      country.numericCode?.toLowerCase().includes(term) ||
      country.currencies?.some((currency: { name: string }) =>
        currency.name.toLowerCase().includes(term)
      ) ||
      country.currencies?.some((currency: { symbol: string }) =>
        currency.symbol.toLowerCase().includes(term)
      ) ||
      country.languages?.some((lang: { name: string }) =>
        lang.name.toLowerCase().includes(term)
      );

    const matchesRegion = region
      ? country.region.toLowerCase() === region
      : true;

    return matchesSearch && matchesRegion;
  });

  return (
    <main className="flex justify-center items-center w-full dark:bg-blue-950 p-4">
      <div className="max-w-[1200px] w-full">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          region={region}
          setRegion={setRegion}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {filteredData.map((country) => (
            <Link
              href={`/${country.numericCode.toLowerCase()}`}
              key={country.name}
              className="bg-white dark:bg-blue-900 rounded-lg shadow-md m-4"
            >
              <Image
                src={country.flags.png}
                alt={country.name}
                width={550}
                height={450}
                className="w-full h-52 object-cover rounded-t-lg border-b-2"
              />
              <div className="py-8 px-4">
                <h2 className="text-xl font-bold mt-2">{country.name}</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Population: {country.population.toLocaleString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Region: {country.region}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Capital: {country.capital}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No countries found matching your search.
          </p>
        )}
      </div>
    </main>
  );
}
