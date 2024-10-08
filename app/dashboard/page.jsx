"use client";
import { db, auth } from "@/firebase/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Bar,
    BarChart,
    Pie,
    PieChart,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import {
    Menu,
    Bell,
    User,
    DollarSign,
    TrendingUp,
    TrendingDown,
    PiggyBank,
    ChevronDown,
    Plus,
    Minus,
    Menu as MenuIcon,
    Badge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Sample data for charts
    const barChartData = [
        { month: "Jan", income: 4000, expenses: 2400 },
        { month: "Feb", income: 3000, expenses: 1398 },
        { month: "Mar", income: 2000, expenses: 9800 },
        { month: "Apr", income: 2780, expenses: 3908 },
        { month: "May", income: 1890, expenses: 4800 },
        { month: "Jun", income: 2390, expenses: 3800 },
    ];

    const pieChartData = [
        { name: "Food", value: 400 },
        { name: "Rent", value: 300 },
        { name: "Utilities", value: 300 },
        { name: "Entertainment", value: 200 },
        { name: "Transport", value: 100 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

    // Fetch user data from Firebase
    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const userCollection = collection(db, "users"); // Adjust collection name as needed
            const userSnapshot = await getDocs(userCollection);
            const userList = userSnapshot.docs.map((doc) => doc.data());
            setUserData(userList.length > 0 ? userList : null); // Set user data or null if empty
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        // Logic for logging out the user
        router.push("/"); // Redirect to home page
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                        <SheetDescription>
                            Navigate through your financial dashboard
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <Button variant="ghost" className="justify-start">
                            <Menu className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Transactions
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Reports
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Categories
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <Bell className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex justify-between items-center p-4 bg-white shadow-sm">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2 md:hidden"
                            onClick={toggleSidebar}
                        >
                            <MenuIcon className="h-6 w-6" />
                        </Button>
                        <h1 className="text-xl font-bold">
                            Personal Finance Tracker
                        </h1>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Button variant="ghost">Dashboard</Button>
                        <Button variant="ghost">Transactions</Button>
                        <Button variant="ghost">Reports</Button>
                        <Button variant="ghost">Settings</Button>
                    </nav>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                {/* Dashboard Content */}
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
                                        $12,345
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
                                        $5,000
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
                                        $3,500
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
                                        75%
                                    </div>
                                    <Progress value={75} className="mt-2" />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Transaction List Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {userData ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Type</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {userData.map(
                                                (transaction, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {transaction.date}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                transaction.category
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {transaction.amount}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    transaction.type ===
                                                                    "expense"
                                                                        ? "destructive"
                                                                        : "default"
                                                                }
                                                            >
                                                                {transaction.type
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    transaction.type.slice(
                                                                        1
                                                                    )}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p>No data available</p>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button>View All Transactions</Button>
                            </CardFooter>
                        </Card>

                        {/* Add Transaction Section */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Add New Transaction</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Date</Label>
                                            <Input id="date" type="date" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="category">
                                                Category
                                            </Label>
                                            <Select>
                                                <SelectTrigger id="category">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="food">
                                                        Food
                                                    </SelectItem>
                                                    <SelectItem value="transport">
                                                        Transport
                                                    </SelectItem>
                                                    <SelectItem value="utilities">
                                                        Utilities
                                                    </SelectItem>
                                                    <SelectItem value="entertainment">
                                                        Entertainment
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="amount">
                                                Amount
                                            </Label>
                                            <Input
                                                id="amount"
                                                type="number"
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Type</Label>
                                            <Select>
                                                <SelectTrigger id="type">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="income">
                                                        Income
                                                    </SelectItem>
                                                    <SelectItem value="expense">
                                                        Expense
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Transaction</Button>
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
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <BarChart data={barChartData}>
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar
                                                dataKey="income"
                                                fill="#8884d8"
                                            />
                                            <Bar
                                                dataKey="expenses"
                                                fill="#82ca9d"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Spending by Category</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <PieChart>
                                            <Pie
                                                data={pieChartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {pieChartData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                COLORS[
                                                                    index %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
