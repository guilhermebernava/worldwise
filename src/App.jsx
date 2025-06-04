import { Route, Routes, Navigate } from "react-router-dom";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Pricing from "./pages/Pricing/Pricing";
import Login from "./pages/Login/Login";
import Logged from "./pages/Logged/Logged";
import Cities from "./components/Cities/Cities";
import ProtectedRoute from "./pages/ProtectedRoute";
import { CitiesProvider } from "./context/CitiesContext";
import "./App.css";
import FormModal from "./components/FormModal/FormModal";
import City from "./components/City/City";
import Countries from "./components/Countries/Countries";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <CitiesProvider>
                <Logged />
              </CitiesProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="cities" replace />} />
          <Route path="cities" element={<Cities />}>
            <Route path="city/:id" element={<City />} />
          </Route>
          <Route path="countries" element={<Countries />} />
          <Route path="formModal/:lat/:lng" element={<FormModal />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
