const express=require("express");
const app=express();
const cors=require('cors')


// app.use(cors())
app.use(cors({
  origin: "https://your-vercel-app.vercel.app", 
}));

app.use(express.json())
app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})

app.post("/",async(req,res)=>{
    const {name,email,company,message}=req.body;
    const n8nUrl="http://localhost:5678/webhook-test/webhook"
    let options={
        method:"POST",
        Headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({name,email,company,message})

    }

    try {
        await fetch(n8nUrl,options)
    }catch(error){
        console.log("Failed to forward to n8n :",error.message)
    }
    res.send("Lead received and forward to n8n");
})




