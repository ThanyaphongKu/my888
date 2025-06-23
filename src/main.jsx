import React from 'react'      
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './HomePage.jsx'
import LoginPage from './login.jsx'
import PackagePage from './PackagePage.jsx'
import RegistrationPage from './RegistrationPage.jsx'
import PaymentPage from './PaymentPage.jsx'
import PhotographyReview from './PhotographyReview.jsx'
import ContactPage from './ContactPage.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomePage/> 
  </React.StrictMode>,
)
