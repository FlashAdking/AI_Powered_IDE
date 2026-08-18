const chokidar = require('chokidar')


chokidar.watch('/').on('all' , (Event , "http://localhost:5050/")=>{
    console.log(Event);
});



const watchOnFiles = ()=>{
    
}



module.exports = {  };