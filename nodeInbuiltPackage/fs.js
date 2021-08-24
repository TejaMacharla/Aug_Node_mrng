var fs=require("fs");
fs.writeFile('mytext.txt','this is NODE.JS file',function(err){
    /* write in file */
    if(err) throw err;
    console.log("file created")
})