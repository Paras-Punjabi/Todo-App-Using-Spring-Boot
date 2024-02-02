"use client"
import React,{useState,useContext} from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import { context } from '@/app/layout'

const Login = () => {
  const {setLoggedInStatus} = useContext(context)
  const router = useRouter()
    const [data, setData] = useState({email:"",password:""})

    const handle = async()=>{
      if(data.name == "" || data.email == "" || data.password == ""){
        return;
      }
      let res  = await axios.post("http://localhost:8081/user/signin",{
        email:data.email,
        password:data.password,
      })
      if(res.data && res.data.id !== null){
        localStorage.setItem("data",JSON.stringify(res.data))
        setData({email:"",password:""})
        // alert("User Logged In")
        setLoggedInStatus(true)
        router.push("/notes")
      }
    }
  return (
    <>
    <div className="lg:w-1/3 my-6 absolute left-2/4 -translate-x-2/4 translate-y-20 scale-110 md:w-1/2 bg-gray-50 rounded-lg p-8 flex justify-center flex-col md:ml-auto w-full md:mt-0 shadow-2xl">
      <h2 className="text-gray-900 text-center text-2xl font-mono mb-1 font-medium title-font">Login</h2>
     
      <div className="relative mb-4">
        <label htmlFor="email"  className="font-mono leading-7 text-sm text-gray-600">Email</label>
        <input placeholder='johnwats@yahoo.com' type="email" value={data.email} onChange={(e)=>{setData({email:e.target.value,password:data.password})}} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="password"  className="font-mono leading-7 text-sm text-gray-600">Password</label>
        <input type="password" placeholder='john12-56' value={data.password} onChange={(e)=>{setData({password:e.target.value,email:data.email})}} id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
     
      <button onClick={handle} className="text-lg font-mono bg-slate-600 hover:bg-slate-700 text-white border-0 py-2 px-6 focus:outline-none rounded text-center">Login</button>
    </div>
    </>
  )
}

export default Login