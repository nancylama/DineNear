import Header from './components/Header';
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import HomePage from "./pages/Home";
import DealsPage from './pages/Deals';
import LoginPage from './pages/Login';
import MenuPage from './pages/Menu';
import PaymentPage from './pages/Payment';
import ReservationPage from './pages/Reservations';
import RestaurantListPage from './pages/RestaurantList';
import UserPage from './pages/User';
import ReviewsPage from './pages/Reviews'
import RegisterPage from './pages/Register';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/restaurant-list" element={<RestaurantListPage />} />
        <Route path="/user-profile" element={<UserPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/restaurant-info" element={<RestaurantInfoPage />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/restaurant" element={<RestaurantInfo />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </div>
  );
};

export default App;
