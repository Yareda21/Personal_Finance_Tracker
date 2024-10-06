"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, PieChart, TrendingUp, Shield } from "lucide-react";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const AnimatedSection = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default function AboutPage() {
    return (
        // <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 bg-[#111827]">
            <AnimatedSection>
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    About FinanceTracker
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Your personal finance companion for a
                                    brighter financial future.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </AnimatedSection>
            <AnimatedSection>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-500 dark:bg-gray-800">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Why Choose FinanceTracker?
                        </h2>
                        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
                            <Card className=" bg-blue-900 text-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <PieChart className="h-5 w-5" />
                                        Comprehensive Insights
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Get a clear picture of your finances with
                                    intuitive charts and detailed breakdowns of
                                    your income and expenses.
                                </CardContent>
                            </Card>
                            <Card className=" bg-blue-900 text-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Goal Setting & Tracking
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Set financial goals and track your progress
                                    over time. Stay motivated and achieve your
                                    financial dreams.
                                </CardContent>
                            </Card>
                            <Card className=" bg-blue-900 text-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Bank-Level Security
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    Your financial data is protected with
                                    state-of-the-art encryption and security
                                    measures. Your privacy is our top priority.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </AnimatedSection>
            <AnimatedSection>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto text-white px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Start Your Financial Journey Today
                                </h2>
                                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Join thousands of users who have taken
                                    control of their finances with
                                    FinanceTracker. It's time to make your money
                                    work for you.
                                </p>
                            </div>
                            <Link href={"/auth"}>
                                <Button className="inline-flex h-10 items-center justify-center rounded-md bg-blue-800 px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                                    Get Started
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </AnimatedSection>
        </main>
        // </div>
    );
}
