import { useState } from 'react'
import { Link, Link2, Github } from 'lucide-react';
import './linkpage.css'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function LinkPage({setThumbnail , setTitle ,setDesc , setTrans,setLink,Link}) {
  const [Loading,setLoading] = useState(false)
  const navigate = useNavigate();

  async function onSubmit()
    {
      try{
        setLoading(true)
      let compdata = await axios.post("https://yatta-server-side.onrender.com/link",{
        "link" : Link})
      
      setTitle(compdata.data.titdesc.title)
      setDesc(compdata.data.titdesc.desc)
      setTrans(compdata.data.trans)
      setThumbnail(compdata.data.thumbnail)
      navigate("/chat");}
      catch(err){
        console.log(err)
        toast.error("Please try with another link")
      }finally{
        setLoading(false)
      }
    }


  return(
    
    <div className="main">
        <div className="btnhousing">
          <h1>Yatta</h1>
          {Loading? (<p>Loading...</p>) : <p>Chat with any Video on Youtube</p>}
          <div className="inputbox">
          <input type="text" className="msg" onChange={(value)=>{setLink(value.target.value)}}  onKeyDown={(e)=>{if(e.key == "Enter")onSubmit();}}/>
          <button className='submit' onClick={onSubmit}>
            <Link2 color='white' />
          </button>
          </div>
        </div>
        <div className="links">
          <div><a href='https://github.com/owlpharoah' target='blank'><img height="32" width="32" src="https://unpkg.com/simple-icons@v14/icons/github.svg" /></a></div>
          <div><a href='https://x.com/op3kay' target='blank'><img height="32" width="32" src="https://unpkg.com/simple-icons@v14/icons/x.svg" /></a></div>
        </div>
    </div>
  )
}

export default (LinkPage);
