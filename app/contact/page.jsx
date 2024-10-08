"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

export default function ContactPage() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
    };

    return (
        <div className=" bg-slate-500 mx-auto w-full h-full px-8 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Get in Touch</CardTitle>
                        <CardDescription>
                            We're here to help with any questions about our
                            Personal Finance Manager.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    placeholder="Subject of your message"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Your message"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                            You can also reach us through the following
                            channels:
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <MailIcon className="h-5 w-5 text-muted-foreground" />
                            <span>support@personalfinancemanager.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                            <span>
                                123 Finance Street, Money City, FC 12345
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
