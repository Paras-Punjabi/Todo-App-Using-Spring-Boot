"use client"
import React,{useState,useEffect,useContext} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { context } from "@/app/layout";
import CreateNoteModal from './CreateNoteModal'

const Page = () => {
  const {setLoggedInStatus}= useContext(context)
  const [isClose, setIsClose] = useState(true);
  const router = useRouter()
  const [data,setData] = useState()
  const [notes,setNotes] = useState([])
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]

  const getNotes = async()=>{
    if(localStorage.getItem("data") === null){
      router.push("/")
      return;
    }
    let d = JSON.parse(localStorage.getItem("data"))
    setData(d)
    
    axios.post("http://localhost:8081/task/getAll",{
      user:d.id
    })
    .then(d=>{
      setNotes(d.data)
      // console.log(d.data);
      setLoggedInStatus(true)
    })
  }
  useEffect(()=>{
      getNotes()
  },[])

  const deleteHandle= async(id)=>{
    let res = await axios.post("http://localhost:8081/task/delete",{
      id:id
    })
    console.log(res.data)
    getNotes()
  }

  return (
    <>
      <div className="container px-3 py-2">
    <button className="ml-3 my-3 bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-basemd:mt-0" onClick={()=>{
      setIsClose(false)
    }}>Create Note</button>
     <CreateNoteModal isClose={isClose} setIsClose={setIsClose} getNotes ={getNotes} id={data && data.id} title={"Create a Note"}/>
      <div className="flex flex-wrap">
        {notes && notes.length === 0 && <h1 className="text-2xl font-mono font-bold pt-8 lg:pt-0">No Notes to Display...<br/>Click on Add Note icon to add notes</h1>}
        {notes &&
          notes.map((item) => {
            return (
              <div key={item.id} className="py-4 relative m-3 cursor-pointer transition-transform border rounded-lg bg-gray-100 px-3 lg:w-auto max-w-xl">
              <div className="h-full flex items-start">
                
                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                  <span className="pb-2 mb-2 border-b-2 border-gray-700">{months[new Date(item.dueDate).getMonth()] + "'" + new Date(item.dueDate).getFullYear().toString().substr(2,2)}</span>
                  <span className="font-medium text-lg text-gray-800 title-font leading-none">{new Date(item.dueDate).getDate()}</span>
                </div>
                <div className="flex-grow pl-6">
                  <h1 className="title-font text-2xl font-mono tracking-tighter font-medium text-gray-900 mb-3">{item.title}</h1>
                  <p className="leading-relaxed mb-2 text-base">{item.description}</p>
                  <p className="leading-relaxed mb-2 text-base">{item.completed ? "Completed" : "Not Completed"}</p>
                  <button className="inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mb-4 mx-1 md:mt-0" id={item.id} onClick={()=>deleteHandle(item.id)} >Delete</button>
                </div>
              </div>
            </div>
            );
          })}
      </div>
      </div>

    </>
  )
}

export default Page