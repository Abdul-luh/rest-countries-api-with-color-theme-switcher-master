"use client";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Nav() {
  const [theme, setTheme] = useState<string | null>(null);

  // Set theme on mount based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Use system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Toggle theme and persist
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="w-full shadow-lg flex justify-center items-center bg-white dark:bg-blue-900">
      <div className="max-w-[1200px] w-full flex justify-between items-center p-4">
        <h3 className="text-2xl font-bold">Where in the world?</h3>
        <div>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded text-secondary-foreground bg-white dark:text-white dark:bg-blue-900 transition-colors flex items-center gap-2"
          >
            {theme === "dark" ? (
              <Sun size={20} className="inline-block" aria-label="Light mode" />
            ) : (
              <Moon size={20} className="inline-block" aria-label="Dark mode" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
