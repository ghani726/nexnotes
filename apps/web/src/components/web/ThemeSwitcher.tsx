"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeSwitcher = ({
    isCol = false,
    isWidthFull = false,
    showShadow = false,
}: {
    isCol?: boolean;
    isWidthFull?: boolean;
    showShadow?: boolean;
}) => {
    const [mounted, setMounted] = useState(false);
    const [slider, setSlider] = useState(0); // 0: system, 1: light, 2: dark

    // Sync slider state with localStorage after the component mounts on the client
    useEffect(() => {
        setMounted(true); //eslint-disable-line
        const savedTheme = localStorage.getItem("theme") || "system";
        if (savedTheme === "light") setSlider(1);
        else if (savedTheme === "dark") setSlider(2);
        else setSlider(0);
    }, []);

    // Handle theme changes and DOM updates safely
    const handleThemeChange = (newSliderValue: number) => {
        setSlider(newSliderValue);

        const newTheme =
            newSliderValue === 0
                ? "system"
                : newSliderValue === 1
                  ? "light"
                  : "dark";

        localStorage.setItem("theme", newTheme);

        if (newTheme === "light") {
            document.documentElement.classList.remove("dark");
        } else if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else if (newTheme === "system") {
            const isSystemDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches;

            if (isSystemDark) document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
        }
    };

    // Classes
    const iconClass = `${isCol ? "w-full h-1/3" : "h-full w-1/3"} flex justify-center items-center p-inset-xs aspect-square rounded-full z-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-hover `;
    const divClass = `flex ${isCol ? "flex-col w-full" : `flex-row min-h-10 ${isWidthFull ? "w-full" : "w-fit"}`} justify-center items-center rounded-full border-main relative bg-surface ${showShadow && "shadow-medium"}`;
    // flex justify-center items-center p-inset-sm h-full aspect-square rounded-full z-1
    
    // Prevent hydration layout mismatch by returning a neutral state until mounted
    if (!mounted) {
        return (
            <div className={divClass}>
                <div
                    className="absolute top-0 left-0 h-full w-1/3 rounded-full bg-brand cursor-pointer"
                    style={{ transform: `translateX(0%)` }}
                ></div>
                <button className={iconClass}>
                    <Monitor size={20} />
                </button>
                <button className={iconClass}>
                    <Sun size={20} />
                </button>
                <button className={iconClass}>
                    <Moon size={20} />
                </button>
            </div>
        );
    }

    return (
        <div suppressHydrationWarning={true} className={divClass}>
            <div
                suppressHydrationWarning={true}
                className={`${isCol ? "h-1/3 w-full" : "h-full w-1/3"} absolute top-0 left-0 rounded-full bg-brand hover:bg-brand-hover transition-transform duration-300 cursor-pointer`}
                style={{
                    transform: `translate${isCol ? "Y" : "X"}(${slider * 100}%)`,
                }}
            ></div>
            <button
                suppressHydrationWarning={true}
                title="System Theme"
                onClick={() => handleThemeChange(0)}
                className={`${iconClass} ${
                    slider === 0 && "text-contrast font-semibold"
                }`}
            >
                <Monitor size={20} />
            </button>
            <button
                suppressHydrationWarning={true}
                title="Light Theme"
                onClick={() => handleThemeChange(1)}
                className={`${iconClass} ${
                    slider === 1 && "text-contrast font-semibold"
                }`}
            >
                <Sun size={20} />
            </button>
            <button
                suppressHydrationWarning={true}
                title="Dark Theme"
                onClick={() => handleThemeChange(2)}
                className={`${iconClass} ${
                    slider === 2 && "text-contrast font-semibold"
                }`}
            >
                <Moon size={20} />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
