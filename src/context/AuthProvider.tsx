import { createContext, useEffect, useState } from "react";
import axios from "@/config/axios";

type User = {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  provider: "email" | "google";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

type Auth = {
  user: User;
  accessToken: string;
};

type ContextProvider = {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  refresh: () => Promise<Auth>;
  loading: boolean;
};

const AuthContext = createContext<ContextProvider | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/auth/refresh");

      if (res.status >= 200 && res.status < 300) {
        return res.data;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      const data = refresh();
      data.then((data) => setAuth(data));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, refresh, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export type { User };
export { AuthContext };
export default AuthProvider;
