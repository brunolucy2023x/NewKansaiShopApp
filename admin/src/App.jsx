import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useAuth } from "@clerk/clerk-react";

/* =========================================================
   PAGES
========================================================= */

import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";

import CategoriesPage from "./pages/CategoriesPage";
import ContentManagerPage from "./pages/ContentManagerPage";
import DealsPage from "./pages/DealsPage";
import ExpertsPage from "./pages/ExpertsPage";
import FAQPage from "./pages/FAQPage";
import FeaturedProductsPage from "./pages/FeaturedProductsPage";
import MessagesPage from "./pages/MessagesPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import PaintingTipsPage from "./pages/PaintingTipsPage";
import StoreLocationsPage from "./pages/StoreLocationsPage";

/* =========================================================
   LAYOUTS
========================================================= */

import DashboardLayout from "./layouts/DashboardLayout";

/* =========================================================
   COMPONENTS
========================================================= */

import PageLoader from "./components/PageLoader";

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  /* =========================================================
     LOADING
  ========================================================= */
  if (!isLoaded) {
    return <PageLoader />;
  }

  return (
    <Routes>
      {/* =====================================================
          LOGIN ROUTE
      ===================================================== */}
      <Route
        path="/login"
        element={
          isSignedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* =====================================================
          PROTECTED ROUTES
      ===================================================== */}
      <Route
        path="/"
        element={
          isSignedIn ? (
            <DashboardLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        {/* Default Route */}
        <Route
          index
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Core Pages */}
        <Route
          path="dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="products"
          element={<ProductsPage />}
        />

        <Route
          path="orders"
          element={<OrdersPage />}
        />

        <Route
          path="customers"
          element={<CustomersPage />}
        />

        {/* Additional Admin Pages */}
        <Route
          path="categories"
          element={<CategoriesPage />}
        />

        <Route
          path="content-manager"
          element={<ContentManagerPage />}
        />

        <Route
          path="deals"
          element={<DealsPage />}
        />

        <Route
          path="experts"
          element={<ExpertsPage />}
        />

        <Route
          path="faq"
          element={<FAQPage />}
        />

        <Route
          path="featured-products"
          element={<FeaturedProductsPage />}
        />

        <Route
          path="messages"
          element={<MessagesPage />}
        />

        <Route
          path="new-arrivals"
          element={<NewArrivalsPage />}
        />

        <Route
          path="painting-tips"
          element={<PaintingTipsPage />}
        />

        <Route
          path="store-locations"
          element={<StoreLocationsPage />}
        />

        {/* 404 INSIDE DASHBOARD */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Route>

      {/* GLOBAL 404 */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              isSignedIn
                ? "/dashboard"
                : "/login"
            }
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;