import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export const HomeLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <TawkMessengerReact
        propertyId={import.meta.env.VITE_TAWK_PROPERTY_ID}
        widgetId={import.meta.env.VITE_TAWK_WIDGET_ID}
      />
    </>
  );
};
