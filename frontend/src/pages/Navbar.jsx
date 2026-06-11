import React from "react";
import { use } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext/AuthContext";

const Navbar = () => {
  const { userData } = use(AuthContext);

  return (
    <>
      <div className="my-5 mx-10">
        {userData && (
          <Link
            className="bg-gray-100 px-4 rounded-2 py-2 mx-2 hover:bg-gray-200"
            to="/home"
          >
            Home
          </Link>
        )}

        <Link
          className="bg-gray-100 px-4 rounded-2 py-2 mx-2 hover:bg-gray-200"
          to="/signin"
        >
          Signin
        </Link>
        <Link
          className="bg-gray-100 px-4 mx-2 rounded-2 py-2 hover:bg-gray-200"
          to="/signup"
        >
          Signup
        </Link>
      </div>
    </>
  );
};

export default Navbar;
