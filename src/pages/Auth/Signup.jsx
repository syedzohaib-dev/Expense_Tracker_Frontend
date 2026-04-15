import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext.jsx'
import axiosInstance from '../../utils/axiosinstance.js'


const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!fullName) {
      setError('Please enter your name')
      return;
    }

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return;
    }
    if (!password) {
      setError('Please enter the passwod')
      return;
    }
    if (password.length < 8) {
      setError('Please enter 8 character passwod')
      return;
    }


    setError('')


    try {
      setLoading(true)
      const response = await axiosInstance.post("/api/v1/auth/register", {
        fullName,
        email,
        password,
        // profileImageUrl: uploadedImageUrl,
      });


      const { token, user, _id } = response.data;

      if (token) {
        localStorage.setItem("expense_token", token);
        updateUser(user);
        navigate("/dashboard");
      }
      if (_id) {
        const userId = _id;
        localStorage.setItem("expense-userId", userId);
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Authlayout>
      <div className="lg:w-100%] h=auto md:h-full mt=10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-4xl font-semibold text-black text-center">Create an Account</h3>
        <p className="text-sm text-slate-700 mt-[5px] mb-10 text-center">
          JOIN us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          {/* <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="John@example.com"
              type="email"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className={`w-full text-white py-3 rounded-lg mt-4 transition-colors duration-300
            ${loading ? "cursor-not-allowed bg-gray-300" : "bg-primary hover:bg-primary-dark"}`}>
            {loading ? "Signing up..." : "SIGN UP"}
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{" "}
            <Link to='/login' className='font-medium text-primary underline'>Login</Link>
          </p>

        </form>
      </div>

    </Authlayout >

  )
}

export default Signup