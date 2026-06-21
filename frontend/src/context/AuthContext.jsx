import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../services/apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ─── REFRESH USER FROM COOKIE ───────────────────────────
const refreshUser = async () => {
  try {
    const { data } = await API.get("/users/profile");
    setUser(data.user || data.data || data);
    localStorage.removeItem("isGuestMode");
  } catch (err) {
    if (localStorage.getItem("isGuestMode") === "true") {
      setUser({
        _id: "guest_user_id",
        name: "Guest User",
        email: "guest@newdrug.com",
        role: "customer",
        isGuest: true
      });
    } else {
      setUser(null);
    }
  }
};

  useEffect(() => {
    const init = async () => {
      await refreshUser();
      setLoading(false);
    };
    init();
  }, []);

  // ─── LOGIN ──────────────────────────────────────────────
  // Cookie is set by the server (httpOnly). We just fetch profile after.
  const login = async (credentials) => {
    const { data } = await API.post("/auth/login", credentials);
    await refreshUser();
    return data;
  };

  // ─── LOGOUT ─────────────────────────────────────────────
  const logout = async () => {
    localStorage.removeItem("isGuestMode");
    try {
      await API.post("/auth/logout"); // server clears the httpOnly cookie
    } catch {}
    setUser(null);
  };

  // ─── GUEST LOGIN ─────────────────────────────────────────
  const guestLogin = () => {
    const guestUser = {
      _id: "guest_user_id",
      name: "Guest User",
      email: "guest@newdrug.com",
      role: "customer",
      isGuest: true
    };
    setUser(guestUser);
    localStorage.setItem("isGuestMode", "true");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        refreshUser,
        guestLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);