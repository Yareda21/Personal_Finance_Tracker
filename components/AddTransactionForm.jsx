import React, { useState } from "react";
import { addTransaction } from "@/firebase/FirebaseUtil"; // Import the Firebase utility function
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const AddTransaction = ({ userId }) => {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("salary");
    const [description, setDescription] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        // Prepare transaction data to be sent to Firestore
        const transactionData = {
            amount: parseFloat(amount), // Convert amount to float
            type,
            category,
            description,
            paymentMethod,
        };

        try {
            // Call Firebase utility function to add transaction
            await addTransaction(userId, transactionData);
            alert("Transaction added successfully");
            // Clear form fields after successful transaction
            setAmount("");
            setCategory("salary");
            setDescription("");
            setPaymentMethod("cash");
            setType("income");
            window.location.reload();
        } catch (error) {
            setError(error.message); // Display error if transaction fails
        } finally {
            setIsLoading(false); // Stop loading animation
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="expense">Expense</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            type="text"
                            placeholder="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                    >
                        <SelectTrigger id="paymentMethod">
                            <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="credit card">
                                Credit Card
                            </SelectItem>
                            <SelectItem value="bank transfer">
                                Bank Transfer
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {isLoading ? (
                    <p className="text-center text-gray-500">
                        Adding transaction...
                    </p>
                ) : (
                    <Button type="submit" className="w-full">
                        Add Transaction
                    </Button>
                )}
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default AddTransaction;
