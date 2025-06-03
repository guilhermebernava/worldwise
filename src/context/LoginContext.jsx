import { createContext, useCallback, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const FAKE_USER = {
  name: "Jack",
  photo: "/images/img-1.jpg",
};

const initialState = {
  user: FAKE_USER,
  status: "loading",
};

const LoginContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "logout":
      return { ...state, user: null };
    default:
      return { ...state };
  }
}

export function LoginProvider({ children }) {
  const [{ user, status }, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const login = useCallback(
    (email, password) => {
      if (user != null) navigate("/app/logged");
      if (email.toLowerCase().includes("teste") && password.includes("123")) {
        dispatch({
          type: "login",
          payload: FAKE_USER,
        });
        navigate("/app/logged");
        return;
      }

      if (user == null) {
        dispatch({ type: "error" });
        return;
      }
    },
    [navigate, user]
  );

  const logout = () => {
    dispatch({ type: "logout" });
    navigate("/");
  };

  return (
    <LoginContext.Provider value={{ user, status, login, logout }}>
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
