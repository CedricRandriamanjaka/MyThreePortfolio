import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Theme } from "@chakra-ui/react";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import { useColorMode } from "@/components/ui/color-mode";

function App() {
  const [themeMode, setThemeMode] = useState("dark");
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    document.body.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    toggleColorMode();
  };

  return (
    <div className="container">
      <Router>
        <Theme appearance={themeMode}>
          <Header toggleTheme={toggleTheme} />
          <Box padding={4}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
          {/* <Footer /> */}
        </Theme>
      </Router>
    </div>
  );
}

export default App;
