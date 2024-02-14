"use client";
import { useTheme } from "next-themes";
import React from "react";
import { MoonIcon, SunIcon } from "./icons";
import { Button } from "@nextui-org/button";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setTheme("dark");
  });

  return (
    // <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
    //   {theme === 'dark' ? <SunIcon className='' size={30} /> : <MoonIcon className='' size={30} />}
    // </button>
    <Button onPress={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Change the mode
    </Button>
  );
}
