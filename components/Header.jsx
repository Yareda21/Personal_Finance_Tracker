"use client";
import Image from "next/image";
import React, { useState } from "react";

import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import Link from "next/link";

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <header className=" sticky top-0 left-0 w-full  right-0 bg-[#001d62] gray-900 z-40">
            <div className="mx-auto shadow-md flex justify-around h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-2">
                <Link
                    className="flex  text-teal-600 dark:text-teal-300"
                    href="/"
                >
                    <DollarSign className="h-6 w-6 text-blue-400" />
                    <span className="hidden md:flex">
                        Personal Finance Manager
                    </span>
                </Link>

                <div className="flex flex-1 items-center justify-end gap-6">
                    <nav
                        aria-label="Global"
                        className={`${
                            isMenuOpen
                                ? "block h-screen bg-slate-700 opacity-90 "
                                : "hidden"
                        } md:block absolute md:relative top-16 left-0 right-0 dark:bg-[#001d62] md:top-0`}
                    >
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="flex flex-col md:flex-row justify-end items-center gap-6 py-4 md:py-0 text-base"
                        >
                            <motion.li variants={itemVariants}>
                                <Link
                                    className="text-white font-bold transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    href="/about"
                                >
                                    About
                                </Link>
                            </motion.li>

                            <motion.li variants={itemVariants}>
                                <Link
                                    className="text-white font-bold transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    href="/contact"
                                >
                                    Contact
                                </Link>
                            </motion.li>

                            <motion.li
                                variants={itemVariants}
                                className="md:hidden"
                            >
                                <Link
                                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
                                    href="/auths"
                                    onClick={closeMenu}
                                >
                                    Login
                                </Link>
                            </motion.li>
                        </motion.ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="flex sm:gap-4">
                            <Link
                                className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
                                href="/auths"
                            >
                                Login
                            </Link>
                        </div>

                        <div>
                            <button
                                onClick={toggleMenu}
                                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 md:hidden"
                            >
                                <span className="sr-only">Toggle menu</span>
                                {isMenuOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Nav;
