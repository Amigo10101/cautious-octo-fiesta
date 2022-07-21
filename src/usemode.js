import { useState } from "react";

export default function useMode() {
  const getMode = () => {
    const tokenString = localStorage.getItem("mode");

    return tokenString;
  };

  const [mode, setMode] = useState(getMode());

  const saveMode = (userMode) => {
    localStorage.setItem("mode", userMode);
    setMode(userMode.mode);
  };

  return {
    setMode: saveMode,
    mode,
  };
}
