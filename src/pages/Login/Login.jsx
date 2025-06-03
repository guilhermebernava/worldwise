import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Main from "../../components/Main/Main";
import { useLogin } from "../../context/LoginContext";
import { useReducer, useState, useEffect } from "react";
import styles from "./Login.module.css";
import Error from "../../components/Error/Error";

const initialState = {
  email: "",
  password: "",
};

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

function Login() {
  const [error, setError] = useState(false);
  const { login, globalError } = useLogin();
  const [{ email, password }, dispatch] = useReducer(reducer, initialState);

  const handleLogin = () => {
    if (!login(email, password)) {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <Main>
      <div className={`${styles.content} ${error ? "shake" : ""}`}>
        <div className={styles.box}>
          <Input
            name="email"
            type="email"
            label="Email Andress"
            placeholder="example@example.com"
            value={email}
            onChange={(e) =>
              dispatch({
                value: e.target.value,
                name: e.target.name,
              })
            }
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="*********"
            isPassword={true}
            value={password}
            onChange={(e) =>
              dispatch({
                value: e.target.value,
                name: e.target.name,
              })
            }
          />
          {globalError != "" && <Error text={globalError} />}
          <Button text="LOG IN" bigButton={true} onClick={handleLogin} />
        </div>
      </div>
    </Main>
  );
}

export default Login;
