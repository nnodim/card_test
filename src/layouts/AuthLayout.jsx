import { Sidebar } from "@/components/auth/Sidebar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import useAuthStore from "@/hooks/useAuthStore";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  const { user } = useAuthStore();
  const isLoggedIn = user ? true : false;
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);

  return (
    <>
      <div className="lg:hidden">
        <Header />
      </div>
      <main className="flex min-h-screen">
        <Sidebar />
        <Outlet />
      </main>
      <div className="lg:hidden">
        <Footer />
      </div>
    </>
  );
};
