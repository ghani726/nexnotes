"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

const ThemeSwitcher = () => {
    // 1. Get Theme from local storage
    const theme =
        typeof window !== "undefined"
            ? localStorage.getItem("theme") || "light"
            : "system";

    // 2. Generate slider value based on theme
    const currentValue =
        theme === "light"
            ? 1
            : theme === "dark"
              ? 2
              : !theme || theme === "system"
                ? 0
                : 0;

    // 3. Slider state
    const [slider, setSlider] = useState(currentValue);

    // 4. Generate new theme name based on slider
    const newTheme = !slider ? "system" : slider === 1 ? "light" : "dark";

    // 5. If old theme and new theme are not same, then change the theme.
    if (theme !== newTheme) {
        localStorage.setItem("theme", newTheme);
        if (newTheme === "light") {
            document.documentElement.classList.remove("dark");
        } else if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else if (newTheme === "system") {
            const isSystemDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches;

            if (isSystemDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }

    return (
        <div
            suppressHydrationWarning={true}
            className="flex justify-center items-center rounded-full border-main w-fit relative h-10 bg-surface"
        >
            <div
                suppressHydrationWarning={true}
                className="absolute top-0 left-0 h-full w-1/3 rounded-full bg-brand hover:bg-brand-hover animate-main cursor-pointer"
                style={{ transform: `translateX(${slider * 100}%)` }}
            ></div>
            <button
                suppressHydrationWarning={true}
                title="System Theme"
                onClick={() => setSlider(0)}
                className={`flex justify-center items-center p-inset-xs h-full aspect-square rounded-full z-1 cursor-pointer focus:outline-2 focus:outline-brand-hover ${slider === 0 && "text-contrast font-semibold"}`}
            >
                <Monitor size={20}></Monitor>
            </button>
            <button
                suppressHydrationWarning={true}
                title="Light Theme"
                onClick={() => setSlider(1)}
                className={`flex justify-center items-center p-inset-xs h-full aspect-square rounded-full z-1 cursor-pointer focus:outline-2 focus:outline-brand-hover ${slider === 1 && "text-contrast font-semibold"}`}
            >
                <Sun size={20}></Sun>
            </button>
            <button
                suppressHydrationWarning={true}
                title="Dark Theme"
                onClick={() => setSlider(2)}
                className={`flex justify-center items-center p-inset-xs h-full aspect-square rounded-full z-1 cursor-pointer focus:outline-2 focus:outline-brand-hover ${slider === 2 && "text-contrast font-semibold"}`}
            >
                <Moon size={20}></Moon>
            </button>
        </div>
    );
};

export default ThemeSwitcher;
