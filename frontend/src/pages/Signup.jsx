import React, { use, useRef, useState } from "react";
import avatar from "../assets/download.png";
import { AuthContext } from "../context/AuthContext/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { serverUrl, userData, setUserData, getUserData } = use(AuthContext);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (backendPic) {
        formData.append("profileImage", backendPic);
      }
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("userName", userName);
      formData.append("password", password);
      const data = await axios.post(`${serverUrl}/signup`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // alert(data.data.message);
      //reset form
      await getUserData();
      setUserData(data.data.user);

      navigate("/home");

      // e.target.reset();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [profilePic, setProfilePic] = useState(avatar);
  const [backendPic, setBackendPic] = useState(null);
  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendPic(file);
    let image = URL.createObjectURL(file);
    setProfilePic(image);
    // console.log(file);
  };
  // console.log(serverUrl);
  return (
    <div className="w-full h-[100vh] flex bg-black justify-center items-center">
      <div className="w-[90%] max-w-[600px] h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-5">
        <h1 className="text-[20px] text-white font-semibold">Sign Up</h1>
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5 w-[100%] justify-center items-center gap-4"
        >
          <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white">
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={handleImage}
            />
            <img src={profilePic} className="w-[100%] h-[100%]" alt="" />
            <div
              className="absolute top-0 opacity-0 flex justify-center w-[100%] h-[100%] bg-black hover:opacity-50 cursor-pointer text-white font-semibold text-[22px] items-center"
              onClick={() => fileRef.current.click()}
            >
              +
            </div>
          </div>
          <div className="w-[80%] h-[40px] flex justify-center gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-[50%] bg-white px-3  rounded-md outline-none border-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-[50%] bg-white px-3  rounded-md outline-none border-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="username"
            className="w-[80%] bg-white px-3 py-2 rounded-md outline-none border-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-[80%] bg-white px-3 py-2 rounded-md outline-none border-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="w-[80%] bg-white px-3 py-2 rounded-md outline-none border-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className=" bg-[#50c8dd] py-2 px-4 rounded-md">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
