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
        <nav className="flex items-center gap-4">
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(pathname === href && 'text-yellow-600 font-semibold hover:scale-105 transition-all')}
                >
                    {label}
                </Link>
                // Highlights the current page on your Navbar
            ))}
        </nav>
    )
}

export default NavItems
