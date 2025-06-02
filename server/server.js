import express from "express"
import { rawTranscript } from "./trans.js"
import { getVideoDetails } from "./titdesc.js"
import { main } from "./gemini.js"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())
//two routes; [POST] one for sending link to the be and getting all details including thumbanail link , title desc and transcript.[POST] second for querying the bot with user prompts being sent

//first one
app.post("/link",async function(req,res){
    
    const link = (req.body.link);
    //function 1 - get video id from link
    const vid = link.split("=")[1]
    //function 2 - get thumnail link
    const thumbnail = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
    //function 3 - get details -- 1 - title + desc 2- transcript ---- ASYNC
    const titdesc = await getVideoDetails(vid)
    const trans = await rawTranscript(vid)
    //function 4 - put all details from fn2,3 into object to save in FE state
    const compdata = {titdesc , trans , thumbnail}
    res.status(200).json(compdata)
})

app.post("/query", async function(req,res){
   try{
     const details = req.body
     
    const groq_res = await main({title:details.title,desc:details.desc,transc:details.transc,query:details.query})
    res.status(200).json({groq_res})
   }catch(error)
   {
    console.log(error);
    res.status(404).json({"msg":"An Error has occured"})
   }
    //details include - query as well as details from first rooute ie thumbnail and other data
    //function - call groq with query parameter (already fed in title)
})



app.listen(PORT,function(){
    console.log("running at PORT 3000")
})