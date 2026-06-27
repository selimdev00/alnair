import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";

import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";

export default function Default({ children }) {
  const location = useLocation();

  // AOS scans the DOM once on init; on client-side route changes the freshly
  // mounted [data-aos] elements are unknown to it and would stay hidden.
  useEffect(() => {
    AOS.refreshHard();
  }, [location.pathname]);

  return (
    <div className="main-wrapper">
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>

      <HeaderComponent />

      <main id="main-content">{children}</main>

      <FooterComponent />
    </div>
  );
}
