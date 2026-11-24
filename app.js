const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const itemRouter = require("./routes/itemRouter");
const categoryRouter = require("./routes/categoryRouter");


const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))

app.use("/",indexRouter);
app.use("/items",itemRouter);
app.use("/categories",categoryRouter)

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