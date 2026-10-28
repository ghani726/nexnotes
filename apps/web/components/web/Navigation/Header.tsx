import Button from "@/components/common/Button";
import ThemeSwitcher from "@/components/web/ThemeSwitcher";
import { Menu } from "lucide-react";
import Link from "next/link";
// import { useState } from "react";

const Header = () => {
    // const [isMenuShown, setIsMenuShown] = useState(false)
    return (
        <header className="fixed top-0 left-0 w-full p-inset-md sm:px-btn-lg md:px-btn-xl lg:px-btn-4xl">
            <div className="p-inset-sm w-full flex rounded-full justify-between items-center gap-normal max-h-16 bg-surface shadow-medium border-main">
                <h3 className="text-brand text-h3 px-btn-sm">
                    Nex
                    <span className="text-primary-text">Notes</span>
                </h3>
                <div className="flex justify-center items-center gap-tight sm:gap-0">
                    <div className="hidden ms:flex">
                        <ThemeSwitcher></ThemeSwitcher>
                    </div>
                    {/* <Button
                        className="hidden sm:flex hover:bg-transparent bg-transparent"
                        size="S"
                        type="Secondary"
                    >
                        <Link href={"/login"}>Sign in</Link>
                    </Button>
                    <Button className="hidden sm:flex" size="S" type="Primary">
                        <Link href={"/register"}>Get Started</Link>
                    </Button> */}
                    <Link href={"/login"}>
                        <Button
                            className="hidden sm:flex hover:bg-transparent bg-transparent"
                            size="S"
                            type="Secondary"
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Link href={"/register"}>
                        <Button
                            className="hidden sm:flex"
                            size="S"
                            type="Primary"
                        >
                            Get Started
                        </Button>
                    </Link>
                    <Button
                        isSquare={true}
                        size="S"
                        className="sm:hidden"
                        type="Secondary"
                    >
                        <Menu size={20}></Menu>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
