import React, { useState } from 'react'
import Mainbox from './components/Mainbox'
import LinkPage from './components/LinkPage'
import "./App.css"
import {Routes , Route} from "react-router-dom"
import {Toaster} from 'react-hot-toast'



const App = () => {
  
  const [Thumbnail, setThumbnail] = useState("")
  const [Title, setTitle] = useState("")
  const [Desc, setDesc] = useState("")
  const [Trans, setTrans] = useState("")
  const [Link,setLink] = useState("")

  return (
    <div><Toaster toastOptions={{style:{background:"transparent",backdropFilter:"blur(10px)", color:"white"}}}/>
    
      <Routes>
        <Route path='/' element={<LinkPage setThumbnail={setThumbnail} setTitle={setTitle} setDesc={setDesc} setTrans={setTrans} setLink={setLink} Link={Link} />} />
        <Route path='/chat' element={<Mainbox Thumbnail={Thumbnail} Title={Title} Desc={Desc} Trans={Trans} Link={Link} />} />
      </Routes>
    </div>
  )
}

export default App
