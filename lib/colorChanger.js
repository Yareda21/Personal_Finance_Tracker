export const SavingsGoalColor = (balance, savingsGoal) => {
    if (balance <= savingsGoal) {
        return "red"; // Return color code or color name
    } else if (balance <= savingsGoal + 500) {
        return "orange";
    } else {
        return "green";
    }
};
