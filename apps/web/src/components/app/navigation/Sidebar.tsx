"use client";

import Button from "@/components/common/Button";
import ThemeSwitcher from "@/components/web/ThemeSwitcher";
import Logout from "@/utils/Logout";
import {
    Trash,
    Users2,
    CheckCircle2,
    UserRound,
    Notebook,
    Menu,
    Archive,
    LogOut,
    HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [hide, setHide] = useState(true);
    const [slider, setSlider] = useState(0);

    // Set the slider Based on current path
    const path = usePathname();

    useEffect(() => {
        if (path.startsWith("/app"))
            setSlider(0); //eslint-disable-line
        else if (path.startsWith("/app/tasks")) setSlider(1);
        else if (path.startsWith("/app/shared")) setSlider(2);
        else if (path.startsWith("/app/trash")) setSlider(3);
        else if (path.startsWith("/app/archived")) setSlider(4);
        else if (path.startsWith("/app/you")) setSlider(5);
    }, [path]);

    // Classes
    const navElementClass = (num: number) =>
        `p-inset-md w-full flex items-center ${hide ? "justify-center aspect-square rounded-full" : "justify-start rounded-3xl"} gap-snug  cursor-pointer animate-main ${slider === num ? "text-contrast" : "hover:bg-gray-100 dark:hover:bg-gray-900"}`;
    const navClass = `${hide ? "rounded-full" : "rounded-3xl"} flex-col justify-center items-center gap-tight w-full bg-surface shadow-medium relative border-main`;
    const labelClass = `font-semibold text-sm animate-slide-in-left z-5 ${hide ? "hidden" : "flex"}`;
    const iconClass = "h-5 w-5 z-5 shrink-0";
    const iconSize = 20;

    // Nav Elements Array
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
            to: "/app/trash",
            number: 3,
            icon: <Trash className={iconClass} size={iconSize}></Trash>,
            name: "Trash",
        },
        {
            to: "/app/archived",
            number: 4,
            icon: <Archive className={iconClass} size={iconSize}></Archive>,
            name: "Archived",
        },
        {
            to: "/app/you",
            number: 5,
            icon: <UserRound className={iconClass} size={iconSize}></UserRound>,
            name: "You",
        },
    ];

    const router = useRouter();
    return (
        <aside
            className={`hidden md:flex flex-col justify-between  items-center h-full p-inset-xs ${hide ? "min-w-18 max-w-18" : "min-w-40"}`}
        >
            {/* Button to Open & Close Sidebar */}
            <Button
                showShadow={true}
                showBorder={true}
                type="Secondary"
                size="NULL"
                className="w-full min-h-13"
                isSquare={hide}
                onClick={() => setHide((prev) => !prev)}
            >
                <Menu></Menu>
                {!hide && <p className="">Close</p>}
            </Button>
            
            {/* Main Navigation */}
            <nav className={navClass}>
                <div
                    style={{
                        transform: `translateY(${slider * 100}%)`,
                    }}
                    className={`absolute cursor-pointer animate-main ${hide ? "rounded-full" : "rounded-3xl"} w-full  bg-brand z-2 ${hide ? "aspect-square" : "h-1/6"}`}
                ></div>
                {Links.map((e) => (
                    <Link
                        key={e.number}
                        title={e.name}
                        href={e.to}
                        onClick={() =>
                            slider !== e.number && setSlider(e.number)
                        }
                        className={navElementClass(e.number)}
                    >
                        {e.icon}
                        <p className={labelClass}>{e.name}</p>
                    </Link>
                ))}
            </nav>

            <ThemeSwitcher
                isCol={hide}
                isWidthFull={true}
                showShadow={true}
            ></ThemeSwitcher>

            {/* Help & Logout */}
            <nav className={navClass}>
                <Link
                    title={"Get Help"}
                    href={"/guide"}
                    className={navElementClass(9)}
                >
                    <HelpCircle size={iconSize}></HelpCircle>
                    <p className={labelClass}>Help</p>
                </Link>
                <button
                    title="Logout"
                    onClick={() => Logout(router, true)}
                    className={`${navElementClass(9)} hover:text-status-error-text hover:bg-status-error-subtle`}
                >
                    <LogOut size={iconSize}></LogOut>
                    <p className={labelClass}>Logout</p>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
