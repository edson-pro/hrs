import authService from "@/services/auth.services";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setCurrentUser = (user) => {
    setUser(user);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      setCurrentUser(response);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(({ user }) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setCurrentUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
