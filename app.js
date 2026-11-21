const express = require("express");
const path = require("node:path");
const pg = require("pg");
const indexRouter = require("./routes/indexRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("views", path.join(__dirname, "views"));
app.use("view engine", "ejs");
app.use(express.urlencoded({extended:true}))

app.use("/",indexRouter)

app.use((error, req, res, next)=>{
    console.error(error);
    res.status(504).send("Sorry an error occured");
});

app.listen(PORT, (error)=>{
    if(error){
        console.error(error);
    }
    else{
        console.log("Listening on "+ PORT);
    }
})