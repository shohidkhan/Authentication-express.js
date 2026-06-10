import React from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const serverUrl = "http://localhost:3000/api";
  const dataInfo = {
    serverUrl,
  };
  return <AuthContext value={dataInfo}>{children}</AuthContext>;
};

export default AuthProvider;
