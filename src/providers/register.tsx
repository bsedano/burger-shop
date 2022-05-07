import { useContext, createContext, ReactNode, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface RegisterProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface RegisterProviderData {
  Register: (user: User) => void;
}

const RegisterContext = createContext<RegisterProviderData>(
  {} as RegisterProviderData
);

const RegisterProvider = ({ children }: RegisterProps) => {
  const navigate = useNavigate();

  const Register = (user: User) => {
    axios
      .post("http://localhost:3001/users", user)
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
  return (
    <RegisterContext.Provider value={{ Register }}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;

export const useRegister = () => useContext(RegisterContext);
