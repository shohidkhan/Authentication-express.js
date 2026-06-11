import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  const serverUrl = "http://localhost:3000/api";

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/getuserdata`, {
        withCredentials: true,
      });
      setUserData(data);
      setLoading(false);
    } catch (error) {
      // navigate("/signin");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await getUserData();
    };

    fetchUserData();
  }, []);

  const dataInfo = {
    serverUrl,
    userData,
    setUserData,
    getUserData,
    loading,
  };

  return (
    <AuthContext.Provider value={dataInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
