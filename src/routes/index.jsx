import { Routes, Route } from "react-router-dom";

// main pages
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx"; 
import PackagePage from "../pages/PackagePage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import PaymentPage from "../pages/PaymentPage.jsx";
import PhotographyReviewPage from "../pages/PhotographyReview.jsx";
import ContactPage from "../pages/ContactPage.jsx";

// admin pages
import AdminDashboard from "../features/Admin/AdminDashboard.jsx";
import AdminBookingPage from "../features/Admin/AdminBookingPage.jsx";
import UserProfile from "../features/User/UserProfile.jsx";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/packages" element={<PackagePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/review" element={<PhotographyReviewPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/booking" element={<AdminBookingPage />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
    </Routes>
  );
}
