import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
