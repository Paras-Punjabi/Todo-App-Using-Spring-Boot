import React ,{useState} from "react";
import axios from 'axios'
export default function CreateNoteModal({ getNotes,id,title,isClose,setIsClose }) {
  
  const [data,setData] = useState({title:"",description:""})
  const [due_date,setDueDate] = useState("")
  const [completed,setCompleted] = useState("")

  async function createNote(){
    let res = await axios.post("http://localhost:8081/task/add",{
        title:data.title,
        description:data.description,
        dueDate:due_date,
        completed:completed,  
        user:id
    })
    console.log(res.data);
    setIsClose(true)
    getNotes()
    setData({title:"",description:""})
    setDueDate("")
    setCompleted(false)
  } 

  return (
    <>
      {!isClose ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-3xl w-3/4">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsClose(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2 flex-auto">
                  <div className="mb-2 pt-0">
                    <input
                      type="text"
                      value={data.title}
                      onChange={(e)=>{setData({title:e.target.value,description:data.description})}}
                      placeholder="Enter title of note"
                      className="px-3 py-3 placeholder-slate-800 text-slate-800 relative w-full bg-white rounded text-sm border  focus:border-gray-700 shadow outline-none focus:outline-none"
                    />
                  </div>

                  <div className="mb-2 pt-0">
                    <textarea
                      type="text"
                      value={data.description}
                      onChange={(e)=>{setData({description:e.target.value,title:data.title})}}
                      placeholder="Enter description of note"
                      className="px-3 resize-none overflow-y-auto py-3 h-44 placeholder-slate-800 text-slate-800 relative w-full bg-white rounded text-sm border focus:border-gray-700 shadow outline-none focus:outline-none"
                    />
                  </div>
                  <div className="mb-2 pt-0">
                    <input type="date" onChange={(e)=>setDueDate(e.target.value)}/>
                  </div>
                  <div className="mb-2 pt-0">
                    <label for="check">Completed   </label>
                        <input type="checkbox" id="check" onChange={(e)=>{
                            setCompleted(Number(e.target.checked))
                        }}/>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="inline-flex items-center bg-red-300 border-0 font-mono  py-2 px-4 focus:outline-none hover:bg-red-400  rounded text-lg mt-4 mx-1 md:mt-0"
                    type="button"
                    onClick={() => {setIsClose(true);setData({title:"",description:""})}}
                  >
                    Close
                  </button>

                   <button
                    className="inline-flex items-center bg-green-300 border-0 font-mono  py-2 px-4 focus:outline-none hover:bg-green-400 rounded text-lg mt-4 mx-1 md:mt-0"
                    type="button"
                    onClick={createNote}
                  >
                    Submit
                  </button>

                 
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}