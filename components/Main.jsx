"use client";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";
import { testimony } from "@/lib/resource";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

const Main = () => {
    const router = useRouter();
    const handleGoogleSignIn = async (event) => {
        event.preventDefault();
        console.log("submited");
        try {
            await signInWithPopup(auth, googleProvider);
            router.push("/dashboard");
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-400">
                                Take Control of Your Finances
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                                Track, analyze, and optimize your personal
                                finances with our easy-to-use platform. Start
                                your journey to financial freedom today.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                Get Started
                            </Button>
                            <Button
                                variant="outline"
                                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-gray-900"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-400">
                        Key Features
                    </h2>
                    <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                        <div className="flex flex-col items-center space-y-2 border-gray-700 p-4 rounded-lg bg-gray-900">
                            <BarChart3 className="h-10 w-10 mb-2 text-blue-400" />
                            <h3 className="text-xl font-bold text-blue-400">
                                Expense Tracking
                            </h3>
                            <p className="text-sm text-gray-400 text-center">
                                Easily log and categorize your expenses to
                                understand your spending habits.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-2 border-gray-700 p-4 rounded-lg bg-gray-900">
                            <PieChart className="h-10 w-10 mb-2 text-blue-400" />
                            <h3 className="text-xl font-bold text-blue-400">
                                Budget Planning
                            </h3>
                            <p className="text-sm text-gray-400 text-center">
                                Create and manage budgets to keep your finances
                                on track and reach your goals.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-2 border-gray-700 p-4 rounded-lg bg-gray-900">
                            <TrendingUp className="h-10 w-10 mb-2 text-blue-400" />
                            <h3 className="text-xl font-bold text-blue-400">
                                Financial Insights
                            </h3>
                            <p className="text-sm text-gray-400 text-center">
                                Get personalized insights and recommendations to
                                improve your financial health.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6 ">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                        What Our Users Say
                    </h2>
                    <div className="flex flex-col md:flex-row items-center max-w-max justify-center">
                        {/* <Button
                                variant="outline"
                                size="icon"
                                className="mr-4"
                            >
                                <ChevronLeft className="h-4 w-4 text-gray-400" />
                                <span className="sr-only">
                                    Previous testimonial
                                </span>
                            </Button> */}
                        {testimony &&
                            testimony.map((element) => {
                                return (
                                    <Card
                                        key={element.name}
                                        className="max-w-lg m-1 bg-white dark:bg-gray-800"
                                    >
                                        <CardContent className="flex flex-col items-center text-center pt-6">
                                            <Avatar className="h-16 w-16 mb-4">
                                                <AvatarImage
                                                    src={element.src}
                                                    alt="User"
                                                />
                                                <AvatarFallback>
                                                    JD
                                                </AvatarFallback>
                                            </Avatar>
                                            <blockquote className="text-lg mb-2 text-gray-700 dark:text-gray-300">
                                                {element.description}
                                            </blockquote>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {element.name}
                                            </p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        {/* 
                            <Button
                                variant="outline"
                                size="icon"
                                className="ml-4"
                            >
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                <span className="sr-only">
                                    Next testimonial
                                </span>
                            </Button> */}
                    </div>
                </div>
            </section>

            <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-800">
                <video
                    className="h-[400px] object-cover ml-[12.5rem]"
                    src="https://res.cloudinary.com/dlomcic7f/video/upload/v1728039763/projects/movie_zctjbx.mp4"
                    loop
                    muted
                    autoPlay
                ></video>
                <div className="container mx-auto px-4 md:px-6 flex flex-col flex-grow">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-400">
                                Start Your Financial Journey Today
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Join thousands of users who have taken control
                                of their finances with FinTrack.
                            </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input
                                    className="max-w-lg flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    onClick={handleGoogleSignIn}
                                >
                                    Sign Up with Google
                                </Button>
                            </form>
                            <p className="text-xs text-gray-400">
                                Its Always Free!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;
