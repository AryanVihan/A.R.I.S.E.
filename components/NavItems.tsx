'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const navItems = [
    { label:'Home', href: '/' },
    { label: 'Companion Dashboard', href: '/companion_dashboard' },
    { label: 'Workspace', href: '/workspace' },
    { label: 'Companions', href: '/companions' },
    { label: 'My Journey', href: '/my-journey' },
    { label: 'Subscription', href: '/subscription' },
]

// This file is used to put links in the Navbar
const NavItems = () => {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(
                        "relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out",
                        "hover:scale-105 hover:text-white transform",
                        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r",
                        "before:from-purple-600/20 before:via-blue-600/20 before:to-cyan-600/20",
                        "before:opacity-0 before:transition-all before:duration-300",
                        "hover:before:opacity-100 hover:shadow-lg hover:shadow-purple-500/25",
                        "text-gray-300 hover:text-white",
                        pathname === href 
                            ? "text-white font-semibold bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-600/30 rounded-lg shadow-lg shadow-purple-500/25 before:opacity-100" 
                            : ""
                    )}
                >
                    <span className="relative z-10 drop-shadow-sm">{label}</span>
                </Link>
            ))}
        </nav>
    )
}

export default NavItems
