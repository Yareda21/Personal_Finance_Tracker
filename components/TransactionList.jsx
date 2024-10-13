"use client";
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "lucide-react";
import {
    getAuth,
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                const transactionsRef = collection(userRef, "transactions");

                const q = query(transactionsRef);
                const fetchTransactions = async () => {
                    try {
                        const transactionSnapshot = await getDocs(q);
                        const transactionsList = transactionSnapshot.docs.map(
                            (doc) => doc.data()
                        );

                        setTransactions(transactionsList);
                        setLoading(false);
                    } catch (error) {
                        setError(error.message);
                        setLoading(false);
                    }
                };
                fetchTransactions();
            } else {
                console.log("No user logged in");
                setTransactions([]);
                setLoading(false);
            }
        });
        return unsubscribe;
    }, [auth]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="max-w-[200px]">
                            Description
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                            Payment Method
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                            Category
                        </TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {transaction.date
                                        .toDate()
                                        .toLocaleDateString()}
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                    {transaction.description}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {transaction.paymentMethod}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {transaction.category}
                                </TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>
                                    <span
                                        className={
                                            transaction.type === "expense"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }
                                    >
                                        {transaction.type === "expense"
                                            ? "Expense"
                                            : "Income"}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No transactions found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TransactionList;
