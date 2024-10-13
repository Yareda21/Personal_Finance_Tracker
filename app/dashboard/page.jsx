// dashboard.js
"use client";
import React, { useState, useEffect } from "react";
import { db, auth } from "@/firebase/firebase";
// import { SavingsGoalColor } from "@/lib/colorChanger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionList from "@/components/TransactionList";
import AddTransactionForm from "@/components/AddTransactionForm";
import {
    DollarSign,
    PiggyBank,
    TrendingDown,
    TrendingUp,
    User,
} from "lucide-react";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";

// import { formatBarChartData, formatPieChartData } from "@/lib/chartData";

import { SavingsGoalColor } from "@/lib/colorChanger";
import BarChartComponent from "@/components/Charts";
import PieChartComponent from "@/components/Chart2";
import { formatBarChartData, formatPieChartData } from "@/lib/chartData";
const Dashboard = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        totalBalance: 0,
        monthlyIncome: 0,
        monthlyExpense: 0,
        savingsGoal: 0,
    });
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [savingsGoal, setSavingsGoal] = useState(userData.savingsGoal);

    const goalStatus =
        userData.totalBalance <= userData.savingsGoal + 500
            ? "Saving is below plan"
            : "You are on track with your saving goal!";
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const fetchUserData = async () => {
                    try {
                        const userDataRef = doc(db, "users", user.uid);
                        const userDataSnap = await getDoc(userDataRef);
                        if (userDataSnap.exists()) {
                            setUserData(userDataSnap.data());
                        } else {
                            console.log("No user data found");
                            setError("User data not found in the database.");
                        }
                    } catch (error) {
                        setError(`Error fetching user data: ${error.message}`);
                    }
                };

                const fetchTransactions = async () => {
                    const userRef = doc(db, "users", user.uid);
                    const transactionsRef = collection(userRef, "transactions");

                    const q = query(transactionsRef);
                    try {
                        const transactionSnapshot = await getDocs(q);
                        const transactionsList = transactionSnapshot.docs.map(
                            (doc) => doc.data()
                        );

                        setTransactions(transactionsList);
                        setError(null);
                    } catch (error) {
                        setError(
                            `Error fetching transactions: ${error.message}`
                        );
                    }
                };

                fetchUserData();
                fetchTransactions();
            } else {
                console.log("No user logged in");
                setError(
                    "No user is logged in. Please log in to view your dashboard."
                );
                setUserData({});
                setTransactions([]);
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (transactions.length > 0) {
            const formattedBarChartData = formatBarChartData(transactions);
            const formattedPieChartData = formatPieChartData(transactions);
            setBarChartData(formattedBarChartData);
            setPieChartData(formattedPieChartData);
        }
    }, [transactions]);

    const handleUpdateSavingsGoal = async () => {
        try {
            if (userData && userData.uid) {
                const userRef = doc(db, "users", userData.uid);
                await updateDoc(userRef, { savingsGoal: savingsGoal });
                console.log("Savings goal updated successfully!");
                window.location.reload();
            } else {
                console.error(
                    "User is not authenticated or user.uid is undefined"
                );
            }
        } catch (error) {
            console.error("Error updating savings goal:", error);
        }
    };

    const handleResetData = async () => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset all data, including transaction history?"
        );

        if (!confirmReset) return;

        try {
            if (userData && userData.uid) {
                const userRef = doc(db, "users", userData.uid);
                const transactionsRef = collection(
                    db,
                    "users",
                    userData.uid,
                    "transactions"
                );

                // Reset financial data to default values
                await updateDoc(userRef, {
                    totalBalance: 0,
                    monthlyIncome: 0,
                    monthlyExpenses: 0,
                    savingsGoal: 0,
                });

                console.log("Data reset successfully!");

                // Delete all transaction history documents
                const querySnapshot = await getDocs(transactionsRef);
                querySnapshot.forEach(async (docSnapshot) => {
                    await deleteDoc(docSnapshot.ref);
                });

                console.log("Transaction history deleted successfully!");

                // Optionally, reload the data
                // window.location.reload();
            } else {
                console.error(
                    "User is not authenticated or user.uid is undefined"
                );
            }
        } catch (error) {
            console.error("Error resetting data:", error);
        }
    };

    console.log(transactions);

    return (
        <div className="flex bg-gray-100">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Dashboard Content */}
                {/* <User /> */}
                <div className="container  mx-auto px-4 py-8">
                    <Card className="flex justify-between items-center">
                        <CardHeader className="flex">
                            <User className="h-4 w-4 text-muted-foreground" />{" "}
                            <CardTitle className="text-sm font-medium">
                                {userData.name}
                            </CardTitle>
                            <div>
                                <Button
                                    onClick={handleResetData}
                                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Reset Data
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col mt-6 justify-center items-center">
                            <div className="text-2xl flex font-bold">
                                <DollarSign className="h-4 w-4 flex mt-2 text-muted-foreground" />{" "}
                                {userData.totalBalance}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {userData.email}
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <main className="flex-1 bg-gray-100">
                    <h3 className=" text-center text-slate-400 text-sm capitalize">
                        start by adding your salary as your first transaction
                        after that just add each income and expense
                    </h3>
                    <div className="container mx-auto px-4 py-8">
                        {/* Overview Section */}
                        {error ? (
                            <div className="mb-4 p-4 bg-red-200 text-red-700 rounded">
                                <p>{error}</p>
                            </div>
                        ) : (
                            <div className="mb-4 p-4 bg-green-200 text-black rounded">
                                <p>{goalStatus}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Balance
                                    </CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {userData.totalBalance}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Monthly Income
                                    </CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {userData.monthlyIncome}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Monthly Expenses
                                    </CardTitle>
                                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {userData.monthlyExpenses}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Saving Goal
                                    </CardTitle>
                                    <PiggyBank className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    {userData.totalBalance !== undefined &&
                                    userData.savingsGoal !== undefined ? (
                                        <div
                                            className="text-xl"
                                            style={{
                                                color: SavingsGoalColor(
                                                    userData.totalBalance,
                                                    userData.savingsGoal
                                                ),
                                            }} // Using inline style
                                        >
                                            Savings Goal: {userData.savingsGoal}
                                        </div>
                                    ) : (
                                        <div>Loading...</div>
                                    )}
                                    <input
                                        type="number"
                                        value={savingsGoal}
                                        onChange={(e) =>
                                            setSavingsGoal(e.target.value)
                                        }
                                        className="mt-2 p-2 pl-1 text-sm text-gray-700"
                                        placeholder="Enter new saving goal"
                                    />
                                    <Button
                                        onClick={handleUpdateSavingsGoal}
                                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded"
                                    >
                                        Update
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Add Transaction Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Add New Transaction</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {userData && (
                                    <AddTransactionForm userId={userData.uid} />
                                )}
                            </CardContent>
                        </Card>

                        {/* Transaction List Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <TransactionList />
                            </CardContent>
                        </Card>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Income vs Expenses (Last 6 Months)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full h-64">
                                        <BarChartComponent
                                            data={barChartData}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Spending by Category</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full h-64">
                                        <PieChartComponent
                                            data={pieChartData}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
