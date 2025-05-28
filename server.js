const express=require("express");
const app=express();
const cors=require('cors')


app.use(cors())

app.use(express.json())
app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})

app.post("/",async(req,res)=>{
    const {name,email,company,message}=req.body;
    const n8nUrl="http://localhost:5678/webhook-test/webhook"
    let options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({name,email,company,message})

    }


    try {
        const response=await fetch(n8nUrl,options)
        console.log("Forwarded to n8n");
        res.send("Lead received and forwarded to n8n");

    }catch(error){
        console.log("Failed to forward to n8n :",error.message)
    }
    res.send("Lead received and forward to n8n");
})




