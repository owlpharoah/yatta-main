import React, { useRef , useEffect, useState } from 'react'
import "./mainbox.css"
import { SendHorizontal,CircleArrowLeft, Link } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { div, title } from 'motion/react-client'
import toast from 'react-hot-toast'



const Mainbox = ({Thumbnail , Title , Link, Desc , Trans}) => {
  const navigate = useNavigate();
  const [Loading,setLoading] =useState(true);
  const inputRef = useRef(null)
  const [R,setR] = useState("")


  useEffect(() => {
  // Only navigate back if any required field is actually missing
  if (!Title || !Desc || !Trans || !Thumbnail) {
    navigate("/");
  }
}, [Title, Desc, Trans, Thumbnail]);


    useEffect(() => {
  // Only navigate back if any required field is actually missing
  if (Loading) {
    setR("");
  }
}, [Loading]);

  

  async function onSubmit(){
    const q = inputRef.current.value;
    if(q.trim().length>0){
    setLoading(true)
    try{
      
    let model_res = await axios.post("https://yatta-server-side.onrender.com/query",{
      'title':Title,
      'desc':Desc,
      'transc':Trans,
      'query':q
    })
    setR(model_res.data.groq_res);
    console.log(R)
    }
    catch(error)
      {
        console.log(error)
        toast.error("Internal Error")
      }
      finally{
        setLoading(false)
      }}else{setLoading(true)}
  }


  return (
    <>
    <div className='mbox'>
      <div className="centerbox">
        <div className="one">
          <div className="upper">
          <img src={Thumbnail} alt="" />
          </div>
          <div className="bottom">
          <p>{Title}</p>
          <a href={Link} target='blank'>Watch it on Youtube</a>
          </div>
          </div>
        <div className="two">
          <div className="qbox">
            <div className="inp">
              <input onKeyDown={(e)=>{if(e.key == "Enter")onSubmit();}} ref={inputRef} type="text" placeholder='Enter your query here..'/>
              <button onClick={onSubmit}><SendHorizontal color="#F9E9C7"/></button>
            </div>
            <div className="result">
              {Loading && <div className='loader'></div>}
              <ReactMarkdown>{R}</ReactMarkdown>
            </div>
          </div>
          </div>
      </div>
      <div className="backbtn">
        <button onClick={()=>{setTimeout(() => {
          navigate("/")
        }, 0);}}><CircleArrowLeft /><p>Go Back</p> </button>
      </div>
    </div>
    </>
  )
}

export default (Mainbox);
