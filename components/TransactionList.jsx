"use client";
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
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
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const transactionsCollection = collection(db, "transactions");
                const q = query(
                    transactionsCollection,
                    where("uid", "==", user.uid)
                );
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
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    transaction.type === "expense"
                                        ? "destructive"
                                        : "default"
                                }
                            >
                                {transaction.type.charAt(0).toUpperCase() +
                                    transaction.type.slice(1)}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TransactionList;
