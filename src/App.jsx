import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Pricing from "./pages/Pricing/Pricing";
import Login from "./pages/Login/Login";
import Logged from "./pages/Logged/Logged";
import Form from "./components/Form/Form";
import ProtectedRoute from "./pages/ProtectedRoute";
import { CitiesProvider } from "./context/CitiesContext";
import "./App.css";
import FormModal from "./components/FormModal/FormModal";
import City from "./components/City/City";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="form" element={<Form />} />
        <Route
          path="app/logged"
          element={
            <ProtectedRoute>
              <CitiesProvider>
                <Logged />
              </CitiesProvider>
            </ProtectedRoute>
          }
        >
          <Route path="formModal/:lat/:lng" element={<FormModal />} />
          <Route path="city/:id" element={<City />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
