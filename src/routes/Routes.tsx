import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Coins } from "../components/Coins/Coins";

class AppRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/coins" element={<Coins />} />
      </Routes>
    );
  }
}

export default AppRoutes;
