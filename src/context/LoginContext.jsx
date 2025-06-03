import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState({
    name: "Jack",
    photo: "images/img-1.jpg",
  });
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();

  const login = useCallback(
    (email, password) => {
      if (user != null) navigate("/logged");
      if (email.toLowerCase().includes("teste") && password.includes("123")) {
        setUser({});
        navigate("/logged");
        return;
      }

      if (user == null) {
        setGlobalError("Invalid Email or Password");
        navigate("/login");
        return;
      }
    },
    [navigate, user]
  );

  const resetGlobalError = () => setGlobalError("");

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <LoginContext.Provider
      value={{ user, globalError, login, resetGlobalError, logout }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (context === undefined)
    throw new Error("LoginContext was used outside of the QuizProvider");
  return context;
}
