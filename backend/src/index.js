const express = require('express');
const cors = require('cors')
const app = express();
const port =  3000;

app.use(cors());
app.use(express.json());



app.get('/health' , (req , res)=>{
    res.status(200).json({
        "message" : "healthy Server"
    })
})

app.use("/compile" , )


app.listen(port , ()=>{
    console.log(`server started at ${port}`)
})