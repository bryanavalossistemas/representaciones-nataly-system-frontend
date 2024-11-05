import Footer from "@/components/layouts/home/Footer";
import Header from "@/components/layouts/home/Header";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
