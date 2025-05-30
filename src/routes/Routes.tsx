import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Coins } from "../components/Coins/Coins";
import { Coin } from "../components/Coin/Coin";

class AppRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/coins" replace />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coins/:id" element={<Coin />} />
        {/* <Route path="/login" element={<LogIn />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    );
  }
}

export default AppRoutes;
