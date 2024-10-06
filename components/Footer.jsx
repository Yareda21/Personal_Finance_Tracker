import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-col bg-gray-700 gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
            <p className="text-xs text-gray-400">
                © 2024 PFM. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link
                    className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-blue-400"
                    href="#"
                >
                    Terms of Service
                </Link>
                <Link
                    className="text-xs hover:underline underline-offset-4 text-gray-400 hover:text-blue-400"
                    href="#"
                >
                    Privacy
                </Link>
            </nav>
        </footer>
    );
};

export default Footer;
