const chokidar = require('chokidar')


// watch current directory
const watcher = chokidar.watch('./workspace/{user_id}/*' , { ignored : /node_modules/});


watcher
    .on('add' , path => console.log(`file added at ${path}`))
    .on('link' , path => console.log(`file added at ${path}`))
    .on('unlink' , path => console.log(`file added at ${path}`))
    .on('addDir' , path => console.log(`file added at ${path}`))
    .on('change' , path => console.log(`file added at ${path}`));


    


