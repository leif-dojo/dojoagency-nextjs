"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when pathname changes
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  }, [pathname]);

  return null;
}