// dashboard.js
"use client";
import React, { useState, useEffect } from "react";
import { db, auth } from "@/firebase/firebase";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { Progress } from "@/components/ui/progress";
import { formatBarChartData, formatPieChartData } from "@/lib/chartData";
import { BarChartComponent, PieChartComponent } from "@/components/Charts";

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
                        }
                    } catch (error) {
                        setError(error.message);
                    }
                };

                const fetchTransactions = async () => {
                    try {
                        const transactionsCollection = collection(
                            db,
                            "transactions"
                        );
                        const q = query(
                            transactionsCollection,
                            where("uid", "==", user.uid)
                        );
                        const transactionSnapshot = await getDocs(q);
                        const transactionsList = transactionSnapshot.docs.map(
                            (doc) => doc.data()
                        );
                        setTransactions(transactionsList);
                    } catch (error) {
                        setError(error.message);
                    }
                };

                fetchUserData();
                fetchTransactions();
            } else {
                console.log("No user logged in");
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

    console.log(userData);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard Content */}
                {/* <User /> */}
                <div className="container  mx-auto px-4 py-8">
                    <Card className="flex bg-blue-300 justify-between items-center">
                        <CardHeader>
                            <User className="h-4 w-4 text-muted-foreground" />{" "}
                            <CardTitle className="text-sm font-medium">
                                {userData.name}
                            </CardTitle>
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
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-4 py-8">
                        {/* Overview Section */}

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
                                    <p className="text-xs text-muted-foreground">
                                        +2% from last month
                                    </p>
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
                                    <p className="text-xs text-muted-foreground">
                                        +10% from last month
                                    </p>
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
                                        {userData.monthlyExpense}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        -5% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Savings Goal
                                    </CardTitle>
                                    <PiggyBank className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {userData.savingsGoal}
                                    </div>
                                    <Progress value={75} className="mt-2" />
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
                            <CardFooter>
                                <Button>View All Transactions</Button>
                            </CardFooter>
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
                                    <BarChartComponent data={barChartData} />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Spending by Category</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <PieChartComponent data={pieChartData} />
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
