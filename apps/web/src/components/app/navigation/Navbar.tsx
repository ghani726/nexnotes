"use client";
// import { Home, PieChart, Wallet, Ellipsis, Receipt } from "lucide-react";
import { Users2, CheckCircle2, UserRound, Notebook } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
    const [slider, setSlider] = useState(0);

    const path = usePathname();
    useEffect(() => {
        if (path === "/app" || path === "/app/")
            setSlider(0); //eslint-disable-line
        else if (path.startsWith("/app/tasks")) setSlider(1);
        else if (path.startsWith("/app/shared")) setSlider(2);
        else if (path.startsWith("/app/you")) setSlider(3);
    }, [path]);

    const iconClass = "h-5 w-5 z-5 shrink-0";
    const iconSize = 24;
    const Links = [
        {
            to: "/app",
            number: 0,
            icon: <Notebook className={iconClass} size={iconSize}></Notebook>,
            name: "Notes",
        },
        {
            to: "/app/tasks",
            number: 1,
            icon: (
                <CheckCircle2
                    className={iconClass}
                    size={iconSize}
                ></CheckCircle2>
            ),
            name: "Tasks",
        },
        {
            to: "/app/shared",
            number: 2,
            icon: <Users2 className={iconClass} size={iconSize}></Users2>,
            name: "Shared",
        },
        {
            to: "/app/you",
            number: 3,
            icon: <UserRound className={iconClass} size={iconSize}></UserRound>,
            name: "You",
        },
    ];
    return (
        <nav
            className={`flex md:sr-only fixed bottom-3 left-1/2 -translate-x-1/2 rounded-full opacity-100 -translate-y md:-translate-y-full md:opacity-0 transition-all ease-in-out duration-300 justify-around items-center bg-surface dark:bg-gray-800 shadow-large max-h-16 h-14`}
        >
            {/* <div
                style={{
                    transform: `translateX(${slider * 100}%)`,
                }}
                className="absolute duration-300 ease-in-out aspect-square rounded-full left-0 h-full w-1/5 bg-primary"
            ></div> */}
            {/* <Link
                title={"Home"}
                onClick={() => {
                    setSlider(0);
                }}
                to={"/app/"}
                className={`p-2.5 w-16 z-5 h-full aspect-square flex flex-col items-center justify-center rounded-full cursor-pointer active:scale-95 ease-in-out duration-200 ${slider === 0 ? "text-surface" : "text-black dark:text-white"}`}
            >
                <Home className="h-6 w-6 shrink-0" size={20}></Home>
                {showLabels && <p className={`font-semibold text-xs `}>Home</p>}
            </Link> */}
            <div
                style={{
                    transform: `translateX(${slider * 100}%)`,
                }}
                className="absolute inset-y-0 left-0 animate-main rounded-full h-full w-1/4 bg-brand z-2"
            ></div>
            {Links.map((e) => (
                <Link
                    key={e.number}
                    title={e.name}
                    href={"/app"}
                    onClick={() => slider !== e.number && setSlider(e.number)}
                    className={`p-inset-md w-18 h-full flex justify-center items-center rounded-full cursor-pointer active:scale-95 animate-main ${slider === e.number ? "text-contrast" : "hover:bg-gray-100 dark:hover:bg-gray-900"}`}
                >
                    {e.icon}
                </Link>
            ))}
        </nav>
    );
};

export default Navbar;
