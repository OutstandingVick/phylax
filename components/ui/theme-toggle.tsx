"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const stored = window.localStorage.getItem("phylax-theme");
    const nextDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: light)").matches ? false : true;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.classList.toggle("light", !nextDark);
  }, []);
  function toggleTheme() {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.classList.toggle("light", !nextDark);
    window.localStorage.setItem("phylax-theme", nextDark ? "dark" : "light");
  }
  return (
    <Button
      variant="secondary"
      className="h-10 w-10 p-0"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
