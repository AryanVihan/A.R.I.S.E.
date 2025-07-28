'use client';

import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show navbar when scrolling up or at the top
            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setIsVisible(true);
            }
            // Hide navbar when scrolling down (but not immediately)
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <nav className={`bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-lg shadow-purple-900/50 backdrop-blur-sm px-6 py-3 flex items-center justify-between z-50 border-b border-purple-800/30 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} sticky`}>
            <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={180}
                        height={40}
                        className="drop-shadow-lg"
                    />
                </div>
            </Link>

            <div className="flex items-center gap-8 text-white">
                <NavItems activePath={pathname} />

                <SignedOut>
                    <SignInButton>
                        <button className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/50">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <div className="relative">
                        <UserButton 
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "ring-2 ring-purple-500 ring-offset-2 ring-offset-slate-900 transition-all duration-300 hover:ring-purple-400 hover:scale-110",
                                    userButtonPopoverCard: "bg-slate-800 border border-purple-700/50 shadow-xl shadow-purple-900/50",
                                    userButtonPopoverText: "text-white",
                                    userButtonPopoverActions: "text-gray-300"
                                }
                            }}
                        />
                    </div>
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar
