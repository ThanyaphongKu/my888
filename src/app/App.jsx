import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes/index.jsx";
import  Navbar  from "@/components/Navbar.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes  />
    </BrowserRouter>
  );
}
