"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Navbar from "./navbar";

export const DarkModeContext = createContext({
  darkMode: false,
  setDarkMode: (_: boolean) => {},
});

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <LayoutWrapper>{children}</LayoutWrapper>
    </DarkModeContext.Provider>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
    </>
  );
}
