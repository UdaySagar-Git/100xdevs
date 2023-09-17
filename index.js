const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const { title } = require("process");
const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));


//to get all todos in network

app.get("/todos",(req,res)=>{

    fs.readFile("todos.json","utf-8",(err,data)=>{
        if(err) throw err;
        else
        res.json(JSON.parse(data));
    })

})


let counter =1;

app.post("/todos",(req,res)=>{

    let newtodo={
        id:counter,
        title : req.body.title,
        description: req.body.description,
    }
    counter+=1;
    fs.readFile("todos.json","utf-8",(err,data)=>{
        let newtodo1 = JSON.parse(data);
        newtodo1.push(newtodo);

        let writetodo=JSON.stringify(newtodo1);
        fs.writeFile("todos.json",writetodo,(err,data)=>{
            res.json(JSON.stringify(data));
        })
    })
})

app.delete("/todos/:id",(req,res)=>{
    let id = Number(req.params.id);

    fs.readFile("todos.json","utf-8",(err,data)=>{
        let todoarr= JSON.parse(data);
        let newtodoarr=[];
        for(let i=0;i<todoarr.length;i++){
            if(todoarr[i].id!=id){
                newtodoarr.push(todoarr[i]);
            }
        }

        fs.writeFile("todos.json",JSON.stringify(newtodoarr),(err,data)=>{
            res.status(200).send();
        })

    })
})

app.delete("/deleteall",(req,res)=>{
    fs.writeFile("todos.json","[]",(err,data)=>{
        console.log("Deleted successfully");
    })
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})


app.listen(3000,()=>console.log("listening at port 3000"));

