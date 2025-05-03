"use client";
"use client";
import React from "react";
import { useTheme } from "../theme-context";

const themes = [
  { key: "dark", label: "🌙" },
  { key: "light", label: "🌞" },
  { key: "purple", label: "💜" },
  { key: "blue", label: "💠" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="theme-switcher">
      {themes.map(({ key, label }) => (
        <button
          key={key}
          aria-label={key}
          aria-pressed={theme === key}
          onClick={() => setTheme(key)}
          tabIndex={0}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
