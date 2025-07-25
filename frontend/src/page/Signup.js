import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
  });

  const handleShowPassword = () => setShowPassword(prev => !prev);
  const handleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProfileImage = async (e) => {
    const imgData = await ImagetoBase64(e.target.files[0]);
    setData(prev => ({
      ...prev,
      image: imgData
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;

    if (!firstName || !email || !password || !confirmPassword) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Exclude confirmPassword from submission
      const { confirmPassword, ...submitData } = data;

      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submitData)
      });

      const dataRes = await res.json();

      if (!res.ok) {
        toast.error(dataRes.message || "Something went wrong.");
        return;
      }

      toast.success(dataRes.message);
      if (dataRes.alert) {
        navigate("/login");
      }

    } catch (err) {
      console.error("Network/server error:", err);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        {/* Profile Image Upload */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img src={data.image || loginSignupImage} className="w-full h-full" alt="profile" />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        {/* Form */}
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnChange}
            placeholder="Enter your First name"
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
            placeholder="Enter your Last name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
            placeholder="Enter your Email"
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
              placeholder="Enter your Password"
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
              placeholder="Enter your Confirm Password"
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
