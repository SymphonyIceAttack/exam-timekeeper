"use client";

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    // Ensure theme is initialized on the client
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    />
  );
}
