import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState(null);
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();

  const login = useCallback(
    (email, password) => {
      debugger;
      if (email.includes("teste") && password.includes("123")) {
        navigate("/logged");
        return;
      }

      if (user == null) {
        setUser({});
        setGlobalError("Invalid Email or Password");
        navigate("/login");
        return;
      }
    },
    [navigate, user]
  );

  const resetGlobalError = () => setGlobalError("");

  return (
    <LoginContext.Provider
      value={{ user, globalError, login, resetGlobalError }}
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
