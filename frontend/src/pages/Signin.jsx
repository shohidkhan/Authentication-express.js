import React, { use, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import axios from "axios";

const Signin = () => {
  const { serverUrl } = use(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${serverUrl}/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      alert(data.data.message);
      //reset form
      // console.log(data);
      e.target.reset();
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="w-full h-[100vh] flex bg-black justify-center items-center">
      <div className="w-[90%] max-w-[600px] h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-5">
        <h1 className="text-[20px] text-white font-semibold">Sign Up</h1>
        <form
          onSubmit={handleSignin}
          className="flex flex-col gap-5 w-[100%] justify-center items-center gap-4"
        >
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
