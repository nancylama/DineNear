import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reservation from "./pages/Reservation";
import RestaurantInfo from './pages/RestaurantInfo';
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/restaurant" element={<RestaurantInfo />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
