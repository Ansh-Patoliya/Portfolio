import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** Scrolls to a home-page section; from other pages it navigates to /#id first. */
export function useGoToSection() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id: string) => {
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(id === "hero" ? "/" : `/#${id}`);
      }
    },
    [pathname, navigate],
  );
}
