// Search.tsx
"use client";
import { SearchIcon } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SearchProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
};

export default function Search({
  searchTerm,
  setSearchTerm,
  region,
  setRegion,
}: SearchProps) {
  const regions = [
    { value: "africa", label: "Africa" },
    { value: "america", label: "America" },
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
    { value: "oceania", label: "Oceania" },
  ];

  return (
    <div className="flex justify-between items-center flex-col md:flex-row gap-4 mb-6">
      {/* Search Box */}
      <div className="relative w-full max-w-[400px]">
        <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-16 p-2 focus:border-gray-300 rounded dark:bg-blue-900 dark:text-white"
        />
      </div>

      {/* Region Dropdown */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="py-2 px-4 focus:border-gray-300 rounded dark:bg-blue-900 dark:text-white min-w-[180px] text-left border border-gray-300">
              {region
                ? regions.find((r) => r.value === region)?.label
                : "Filter by region"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[180px] dark:bg-blue-900 dark:text-white">
            {regions.map((r) => (
              <DropdownMenuCheckboxItem
                className="hover:dark:bg-blue-950"
                key={r.value}
                checked={region === r.value}
                onCheckedChange={() =>
                  setRegion(region === r.value ? "" : r.value)
                }
              >
                {r.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
