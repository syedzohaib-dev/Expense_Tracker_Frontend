import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext.jsx'
import axiosInstance from '../../utils/axiosinstance.js'

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return;
    }

    if (!password) {
      setError("Please enter the pssword");
      return;
    }

    setError("")

    try {
      setLoading(true)
      const response = await axiosInstance.post("api/v1/auth/login", {
        email,
        password,
      });
      console.log("login data ==> ", response.data)
      // Agar login successful ho to token save karo

      const { token, user, id } = response.data;

      if (token) {
        localStorage.setItem("expense_token", token);
        updateUser(user)
        navigate("/dashboard");
      }
      if (id) {
        const userId = id;
        localStorage.setItem("expense-userId", userId);
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      )
    } finally {
      setLoading(false);
    }
  }


  return (
    <Authlayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Wellcome back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your detail to log in</p>

        <form onSubmit={handleLogin}>
          <Input
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label='Email Address'
            placeholder='John@example.com'
          />

          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder='Min 8 Characters'
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className={`w-full text-white py-3 rounded-lg mt-4 transition-colors duration-300
            ${loading ? "cursor-not-allowed bg-gray-300" : "bg-primary hover:bg-primary-dark"}`}>
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link to='/signup' className='font-medium text-primary underline'>Signup</Link>
          </p>

        </form>
      </div>
    </Authlayout>
  )
}

export default Login