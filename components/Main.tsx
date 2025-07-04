import React from "react";
import Search from "./Search";
import data from "@/data.json";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <main className="flex justify-center items-center w-full dark:bg-blue-950 p-4">
      <div className="max-w-[1200px] w-full ">
        <Search />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((country) => (
            <Link
              href={`/${country.name.toLowerCase()}`}
              key={country.name}
              className="bg-white dark:bg-blue-900 rounded-lg shadow-md m-4"
            >
              <Image
                src={country.flags.png}
                alt={country.name}
                width={550}
                height={450}
                className="w-full h-52 object-cover rounded-t-lg"
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
      </div>
    </main>
  );
}
