import React, { useState } from 'react'
import api from '../api'
import useAppContext from '../context/Context'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import '../styles/login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAppContext()
  const { push } = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/login', { email, password })
      setUser({ token: data.token })
      push('/home')
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="h-full h-screen flex justify-center items-center page-login">
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center gap-10 bg-white h-[600px] w-[400px] rounded-lg p-2 border-2 border-green-700'
      >
        <p className='text-xl font-bold text-green-600 mt-[-30px] mb-7'>FlyMoney💸</p>
        <input
          className='border-green-700 border border-2 pl-7 pr-7 pt-3 pb-3 rounded outline-green-400'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          minLength={2}
          required
        />

        <input
          className='border-green-700 border border-2 pl-7 pr-7 pt-3 pb-3 rounded outline-green-400'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          minLength={8}
          required
        />

        <button className='bg-white p-2 rounded pl-5 pr-5 capitalize border border-green-700 mt-5 bg-green-700 text-black font-bold'>sign in</button>
      </form>
    </div>
  )
}

export default Login
