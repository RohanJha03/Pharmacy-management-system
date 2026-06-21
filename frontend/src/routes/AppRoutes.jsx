import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// =========================
// AUTH
// =========================
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import VerifyOTP from "../features/auth/pages/VerifyOTP";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyResetOTP from "../features/auth/pages/VerifyResetOTP";
import ResetPassword from "../features/auth/pages/ResetPassword";

// =========================
// CORE
// =========================
import Dashboard from "../features/dashboard/Dashboard";

// =========================
// LAYOUT & PROTECTION
// =========================
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoutes";

// =========================
// ACCOUNT
// =========================
import Profile from "../features/account/pages/Profile";
import Settings from "../features/account/pages/Settings";

import SecuritySettingsSection from
  "../features/account/components/settings/components/SecuritySettingsSection";
import NotificationSettingsSection from
  "../features/account/components/settings/components/NotificationSettingsSection";
import AdminControlsSection from
  "../features/account/components/settings/components/AdminControlsSection";
import PaymentSettingsSection from
  "../features/account/components/settings/components/PaymentSettingsSection";
import DangerZoneSection from
  "../features/account/components/settings/components/DangerZoneSection";
import SavedAddressesSection from "../features/account/components/settings/components/SavedAddressesSection";

// =========================
// USERS
// =========================
import Users from "../features/users/pages/Users";
import AdminUsers from "../features/users/pages/AdminUsers";
import UserDetails from "../features/users/pages/UserDetails";

// =========================
// ORDERS
// =========================
import Orders from "../features/orders/pages/Orders";
import OrderDetails from "../features/orders/pages/OrderDetails";
import ReviewOrders from
  "../features/cart/pages/ReviewOrders";
import TrackOrders from "../features/orders/pages/TrackOrders";
import Invoice from "../features/orders/components/Invoice";

// =========================
// MEDICINES
// =========================
import AdminMedicines from "../features/medicines/pages/AdminMedicines";

import CustomerBilling from
  "../features/medicines/pages/CustomerBilling";

// =========================
// REPORTS
// =========================
import Reports from "../features/reports/Reports";

// =========================
// PAYMENT PAGE
// =========================
import Payment from
  "../features/payment/pages/Payment";
import PaymentHistory from
  "../features/payment/pages/PaymentHistory";

export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const role = user?.role || null;

  return (

    <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================= */}

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard/medicines"
            replace
          />
        }
      />

      <Route
        path="/login"
        element={user && !user.isGuest ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      <Route
        path="/signup"
        element={user && !user.isGuest ? <Navigate to="/dashboard" replace /> : <Signup />}
      />

      <Route
        path="/verify-otp"
        element={<VerifyOTP />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/verify-reset-otp"
        element={<VerifyResetOTP />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* =========================
          PROTECTED ROUTES
      ========================= */}

      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>

          {/* =========================
              DASHBOARD
          ========================= */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* =========================
              ACCOUNT
          ========================= */}

          <Route
            path="/dashboard/profile"
            element={user && !user.isGuest ? <Profile /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/dashboard/settings"
            element={user && !user.isGuest ? <Settings userInfo={user} /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/dashboard/settings/security"
            element={
              <SecuritySettingsSection />
            }
          />

          <Route
            path="/dashboard/settings/notifications"
            element={
              <NotificationSettingsSection />
            }
          />

          <Route
            path="/dashboard/settings/admin-controls"
            element={
              role === "admin"
                ? (
                  <AdminControlsSection />
                )
                : (
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                )
            }
          />

          <Route
            path="/dashboard/settings/danger-zone"
            element={
              <DangerZoneSection />
            }
          />

          <Route
            path="/dashboard/settings/addresses"
            element={
              <SavedAddressesSection />
            }
          />

          <Route
            path="/dashboard/settings/payments"
            element={
              role === "customer"
                ? (
                  <PaymentSettingsSection />
                )
                : (
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                )
            }
          />

          {/* =========================
              USERS
          ========================= */}

          <Route
            path="/dashboard/users"
            element={
              role === "admin" || role === "staff"
                ? (
                  <Users />
                )
                : (
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                )
            }
          />

          <Route
            path="/dashboard/admin-users"
            element={
              role === "admin"
                ? (
                  <AdminUsers />
                )
                : (
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                )
            }
          />

          <Route
            path="/dashboard/users/:id"
            element={<UserDetails />}
          />

          <Route
            path="/dashboard/customers"
            element={
              role === "staff"
                ? <Users filterRole="customer" />
                : <Navigate to="/dashboard" replace />
            }
          />

          <Route
            path="/dashboard/customers"
            element={
              <Users
                role="customer"
                title="Approved Customers"
              />
            }
          />

          {/* =========================
              MEDICINES
          ========================= */}

          {/* ADMIN / STAFF */}
          <Route
            path="/dashboard/manage-medicines"
            element={
              role === "admin" ||
                role === "staff"
                ? (
                  <AdminMedicines />
                )
                : (
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                )
            }
          />

          {/* CUSTOMER MEDICINES */}
          <Route
            path="/dashboard/medicines"
            element={
              role === "customer"
                ? (
                  <CustomerBilling />
                )
                : (
                  <Navigate
                    to="/dashboard/manage-medicines"
                    replace
                  />
                )
            }
          />

          {/* REVIEW ORDER */}
          <Route
            path="/dashboard/review-orders"
            element={
              role === "customer" && !user?.isGuest
                ? (
                  <ReviewOrders />
                )
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          {/* PAYMENT */}
          <Route
            path="/dashboard/payments"
            element={
              role === "customer" && !user?.isGuest
                ? (
                  <Payment />
                )
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          {/* PAYMENT HISTORY */}
          <Route
            path="/dashboard/payment-history"
            element={
              role === "customer" && !user?.isGuest
                ? (
                  <PaymentHistory />
                )
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          {/* TRACK ORDER */}
          <Route
            path="/dashboard/track-orders"
            element={
              role === "customer" && !user?.isGuest ? (
                <TrackOrders />
              ) : (
                <Navigate
                  to="/login"
                  replace
                />
              )
            }
          />

          {/* INVOICE */}
          <Route
            path="/dashboard/invoice/:orderId"
            element={
              role === "customer" && !user?.isGuest ? (
                <Invoice />
              ) : (
                <Navigate
                  to="/login"
                  replace
                />
              )
            }
          />

          {/* =========================
              ORDERS
          ========================= */}

          <Route
            path="/dashboard/orders"
            element={user && !user.isGuest ? <Orders /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/dashboard/orders/:id"
            element={user && !user.isGuest ? <OrderDetails /> : <Navigate to="/login" replace />}
          />

          {/* =========================
              REPORTS
          ========================= */}

          <Route
            path="/dashboard/reports"
            element={
              role === "admin"
                ? (
                  <Reports />
                )
                : (
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                )
            }
          />

        </Route>

      </Route>

      {/* =========================
          FALLBACK ROUTE
      ========================= */}

      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen bg-black">

            <h1 className="text-4xl font-bold text-red-500">

              404 Page Not Found

            </h1>

          </div>
        }
      />

    </Routes>
  );
}