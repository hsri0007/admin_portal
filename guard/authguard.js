import React, { useEffect, useState } from "react";
import Login from "../components/login/login";

const AuthGuard = ({ children }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    const token = window.localStorage.storingAuthTokens;
    if (token) {
      setState(true);
    }
  }, []);

  if (!state) {
    return <Login />;
  }
  return <div>{children}</div>;
};

export default AuthGuard;
