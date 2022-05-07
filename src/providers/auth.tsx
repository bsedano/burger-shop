import { useContext, createContext, ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthContextProps {
  children: ReactNode;
}
interface User {
  email: string;
  password: string;
}

interface AuthProviderData {
  Login: (user: User) => void;
  Logout: () => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

const AuthProvider = ({ children }: AuthContextProps) => {
  const navigate = useNavigate();

  const Login = (user: User) => {
    axios
      .post("http://localhost:3001/login", user)
      .then((response) => {
        localStorage.setItem("token", response.data.acessToken);

        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <AuthContext.Provider value={{ Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
