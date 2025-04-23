import Header from './Components/Header';
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import HomePage from "./Pages/Home";
import DealsPage from './Pages/Deals';
import LoginPage from './Pages/Login';
import MenuPage from './Pages/Menu';
import PaymentPage from './Pages/Payment';
import ReservationPage from './Pages/Reservations';
import RestaurantInfoPage from './Pages/RestaurantInfo';
import RestaurantListPage from './Pages/RestaurantList';
import UserPage from './Pages/User';
import ReviewsPage from './Pages/Reviews';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/restaurant-list" element={<RestaurantListPage />} />
        <Route path="/user-profile" element={<UserPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/restaurant-info" element={<RestaurantInfoPage />} />
      </Routes>
    </div>
  );
};

export default App;
