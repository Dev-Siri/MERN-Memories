import { Box, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import useAuthStore from "./store/auth";

import Navbar from "./components/Navbar/Navbar";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home";

export default function App() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if ((user?.exp ?? 0) <= Date.now() / 1000) setUser(null);
  }, []);

  return (
    <>
      <CssBaseline />
      <Box display="flex" justifyContent="center">
        <Navbar />
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
      </Routes>
    </>
  );
}
