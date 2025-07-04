import React from "react";
import Search from "./Search";
import data from "@/data.json";
import Image from "next/image";

export default function Main() {
  console.log(data);
  return (
    <main className="flex justify-center items-center w-full dark:bg-blue-950 p-4">
      <div className="max-w-[1200px] w-full ">
        <Search />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((country) => (
            <div
              key={country.name}
              className="bg-white dark:bg-blue-900 rounded-lg shadow-md m-4 p-4"
            >
              <Image
                src={country.flags.png}
                alt={country.name}
                height={320}
                width={320}
                className="w-full h-32 object-cover rounded-t-lg"
              />
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
          ))}
        </div>
      </div>
    </main>
  );
}
