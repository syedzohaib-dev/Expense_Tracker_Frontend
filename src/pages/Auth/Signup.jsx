import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector.jsx'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext.jsx'
import axios from 'axios'
import axiosInstance from '../../utils/axiosinstance.js'


const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState('')

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault()

  

    if (!fullName) {
      setError('Please enter your name')
      return;
    }

    if (!email) {
      setError('Please enter a valid email address.')
      return;
    }
    if (!password) {
      setError('Please enter the passwod')
      return;
    }

    setError('')

    // signup API call
    //   try {



    //     const response = await axiosInstance.post("api/v1/auth/register", {
    //       fullName,
    //       email,
    //       password,
    //     });



    //     // Agar login successful ho to token save karo

    //     const { token, user } = response.data;

    //     if (token) {
    //       localStorage.setItem("token", token);
    //       updateUser(user)
    //       navigate("/login");
    //     }

    //   } catch (error) {
    //     console.error(
    //       "Signup failed:",
    //       error.response?.data?.message || error.message
    //     );
    //   }
    // }

    try {
      // let profileImageUrl = "";

      // Step 1: Upload image to Cloudinary via your backend
      if (profilePic) {
        const formData = new FormData();
        formData.append("image", profilePic);

        const uploadRes = await axiosInstance.post("/api/v1/auth/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(uploadRes)

        setProfileImageUrl(uploadRes.data.imageUrl);
      }

      console.log(profileImageUrl);
      

      // Step 2: Register user with image URL
      const response = await axiosInstance.post("/api/v1/auth/register", {
        fullName,
        email,
        password,
        profileImageUrl,
      });


      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        // navigate("/login");
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Authlayout>
      <div className="lg:w-100%] h=auto md:h-full mt=10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          JOIN us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

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

          <button type='submit' className='btn-primary'>SIGN UP</button>

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