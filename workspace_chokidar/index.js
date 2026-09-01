const express = require('express');
const app = express()


app.use(express.json());


app.get('/' , ( req , res) => {
    res.status(200).json({
        "message" : "server health 200"
    });

    return;
} )


app.listen(3000 , ()=>{
    console.log('server started at 3000');
})