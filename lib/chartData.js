// chartDataFormatter.js
export const formatBarChartData = (transactions) => {
    const barChartData = transactions.reduce((acc, transaction) => {
        const month = new Date(transaction.date).toLocaleString("default", {
            month: "long",
            year: "numeric",
        });
        if (!acc[month]) {
            acc[month] = { income: 0, expenses: 0 };
        }
        if (transaction.type === "income") {
            acc[month].income += transaction.amount;
        } else {
            acc[month].expenses += transaction.amount;
        }
        return acc;
    }, {});

    return Object.keys(barChartData).map((month) => ({
        month,
        income: barChartData[month].income,
        expenses: barChartData[month].expenses,
    }));
};

export const formatPieChartData = (transactions) => {
    const pieChartData = transactions.reduce((acc, transaction) => {
        if (transaction.type === "expense") {
            if (!acc[transaction.category]) {
                acc[transaction.category] = 0;
            }
            acc[transaction.category] += transaction.amount;
        }
        return acc;
    }, {});

    return Object.keys(pieChartData).map((category) => ({
        name: category,
        value: pieChartData[category],
    }));
};
