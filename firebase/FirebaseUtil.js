// firebaseUtils.js
import { doc, collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Import your Firebase config

// Add transaction to Firebase
export const addTransaction = async (userId, transactionData) => {
    console.log(userId);
    try {
        // Reference to the user's transaction sub-collection
        const transactionsRef = collection(db, "users", userId, "transactions");

        // Add new transaction document
        await addDoc(transactionsRef, {
            amount: transactionData.amount,
            type: transactionData.type, // 'income' or 'expense'
            category: transactionData.category, // e.g., groceries, salary
            date: transactionData.date || new Date(), // Timestamp of transaction
            description: transactionData.description || "", // Optional description
            paymentMethod: transactionData.paymentMethod || "cash", // Optional payment method
        });

        // Update user's total balance, monthly income, or expenses
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            let newTotalBalance = userData.totalBalance;
            let newMonthlyIncome = userData.monthlyIncome;
            let newMonthlyExpenses = userData.monthlyExpenses;

            if (transactionData.type === "income") {
                newTotalBalance += transactionData.amount;
                newMonthlyIncome += transactionData.amount;
            } else if (transactionData.type === "expense") {
                newTotalBalance -= transactionData.amount;
                newMonthlyExpenses += transactionData.amount;
            }

            // Update the user's total balance, income, and expenses
            await updateDoc(userDocRef, {
                totalBalance: newTotalBalance,
                monthlyIncome: newMonthlyIncome,
                monthlyExpenses: newMonthlyExpenses,
            });
        }

        console.log("Transaction added successfully!");
    } catch (error) {
        console.error("Error adding transaction:", error.message);
        throw new Error(error.message); // So you can handle the error in the component
    }
};
