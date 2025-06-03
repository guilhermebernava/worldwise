import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Pricing from "./pages/Pricing/Pricing";
import Login from "./pages/Login/Login";
import Logged from "./pages/Logged/Logged";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="logged" element={<Logged />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
