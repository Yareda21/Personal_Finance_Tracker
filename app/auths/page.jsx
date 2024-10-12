"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { auth, db, googleProvider } from "@/firebase/firebase"; // Make sure to update the path accordingly
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AuthPage() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event, mode) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (mode === "signup") {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                const userDataRef = doc(db, "users", user.uid);
                const userDataSnap = await getDoc(userDataRef);

                if (!userDataSnap.exists()) {
                    const userData = {
                        uid: user.uid,
                        name: name,
                        email: email,
                        password: password,
                        totalBalance: 0,
                        monthlyIncome: 0,
                        monthlyExpenses: 0,
                        savingsGoal: 0,
                        currencyPreference: "USD",
                        createdAt: new Date(),
                        goals: [],
                    };
                    await setDoc(userDataRef, userData);
                }
                router.push("/dashboard");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                const user = auth.currentUser;
                router.push("/dashboard");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const userDataRef = doc(db, "users", user.uid);
            const userDataSnap = await getDoc(userDataRef);

            if (!userDataSnap.exists()) {
                const userData = {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    profilePicture: user.photoURL,
                    totalBalance: 0,
                    monthlyIncome: 0,
                    monthlyExpenses: 0,
                    savingsGoal: 0,
                    currencyPreference: "USD",
                    createdAt: new Date(),
                    goals: [],
                };
                await setDoc(userDataRef, userData);
            }
            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className="bg-[#111827] py-24 flex justify-center items-center">
            <Card className="w-[350px]  md:w-[40%]">
                <CardHeader>
                    <CardTitle>Finance Tracker</CardTitle>
                    <CardDescription>
                        Sign in or create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="signin">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signin">
                            <form onSubmit={(e) => handleSubmit(e, "signin")}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="signin-email">
                                            Email
                                        </Label>
                                        <Input
                                            id="signin-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="signin-password">
                                            Password
                                        </Label>
                                        <Input
                                            id="signin-password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <Button
                                    className="w-full mt-4"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing In..." : "Sign In"}
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="signup">
                            <form onSubmit={(e) => handleSubmit(e, "signup")}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="signup-name">
                                            Name
                                        </Label>
                                        <Input
                                            id="signup-name"
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="signup-email">
                                            Email
                                        </Label>
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="signup-password">
                                            Password
                                        </Label>
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="signup-phone-number">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="signup-phone-number"
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <Button
                                    className="w-full mt-4"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Signing Up..." : "Sign Up"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleSignIn}
                    >
                        Sign in with Google
                    </Button>
                </CardFooter>
                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </Card>
        </main>
    );
}
