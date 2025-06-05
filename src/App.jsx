import { Route, Routes, Navigate } from "react-router-dom";
import { CitiesProvider } from "./context/CitiesContext";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";

import "./App.css";
import { lazy, Suspense } from "react";

//irao carregar conforme chamado, isso melhora o BUNDLE do REACT
//que deixa a primeira vez que abrir o site melhor
const Home = lazy(() => import("./pages/Home/Home"));
const Product = lazy(() => import("./pages/Product/Product"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const Login = lazy(() => import("./pages/Login/Login"));
const Logged = lazy(() => import("./pages/Logged/Logged"));
const Cities = lazy(() => import("./components/Cities/Cities"));
const Countries = lazy(() => import("./components/Countries/Countries"));
const FormModal = lazy(() => import("./components/FormModal/FormModal"));
const City = lazy(() => import("./components/City/City"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));

function App() {
  return (
    <div className="app">
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route index element={<Home />} />
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
      </Suspense>
    </div>
  );
}

export default App;
