import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth");
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};
