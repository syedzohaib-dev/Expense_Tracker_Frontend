import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input.jsx'
import { validateEmail } from '../../utils/helper.js'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext.jsx'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter a valid email address.')
      return;
    }

    if (!password) {
      setError("Please enter the pssword");
      return;
    }

    setError("")

    // login API call

    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });

      // Agar login successful ho to token save karo

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard");
      }

    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
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

          <button type='submit' className='btn-primary'>LOGIN</button>

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