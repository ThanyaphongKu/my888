import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/index.css";
import App from "./App.jsx";

import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx"; 
import PackagePage from "../pages/PackagePage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import PaymentPage from "../pages/PaymentPage.jsx";
import PhotographyReviewPage from "../pages/PhotographyReview.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import AdminDashboard from "../features/Admin/AdminDashboard.jsx";
import AdminBookingPage from "../features/Admin/AdminBookingPage.jsx";
import UserProfile from "../features/User/UserProfile.jsx";
import AUsersPage from "../features/Admin/AUsersPage.jsx";
import AdminPackagesPage from "../features/Admin/AdminPackagesPage.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PackagePage/>
  </React.StrictMode>
);
