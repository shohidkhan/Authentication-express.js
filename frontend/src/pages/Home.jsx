import React from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { use } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { serverUrl, userData, setUserData, loading } = use(AuthContext);
  const navigation = useNavigate();

  console.log(userData);

  // if (!userData) {
  //   return navigation("/signin");
  // }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      setUserData(null);
      navigation("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#0d1818]">
      <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white">
        <img
          src={userData.user.profileImage}
          className="w-[100%] h-[100%]"
          alt=""
        />
      </div>
      <p className="text-white text-[20px] font-semibold">
        Hey, {userData.user.userName} , welcome to the ultimate backend course
      </p>
      <button
        onClick={handleLogout}
        type="submit"
        className=" bg-[#50c8dd] py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
