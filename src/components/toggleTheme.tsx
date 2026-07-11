"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ToggleTheme = () =>{
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") ?? "light";

    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    setTheme(next);
  };

  return (
    <button
      className="btn btn-ghost btn-square"
      onClick={toggleTheme}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

export default ToggleTheme