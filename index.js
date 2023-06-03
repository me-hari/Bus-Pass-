const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const ejs = require("ejs")
const RegisterModel = require("./models/registeration")
const bodyparser = require("body-parser")
const LocalStorage=require("node-localstorage").LocalStorage
localStorage=new LocalStorage("./scratch")
const cookieparser=require('cookie-parser')


mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://prempk7172:ggci3jXCQZKcjcBU@cluster0.t3aocj0.mongodb.net/")
.then((data)=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log(err)
})


app = express();
app.use(cookieparser());
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    var k=req.cookies.Userstatus;
    res.render("home",{main:k});
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/driverdetails",(req,res)=>{
    res.render("driver")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/team",(req,res)=>{
    res.render("team")
})

app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/logout",(req,res)=>
{
   var k = req.cookies.Userstatus;
    localStorage.removeItem(k);
    res.clearCookie("User status");
    res.redirect('/')
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/sturegis",(req,res)=>{
    res.render("sturegister")
})

app.get("/adminregis",(req,res)=>{
    res.render("adminregister")
})

app.get("/studentlogin",(req,res)=>{
    res.render("stulogin")
})

app.get("/adminlogin",(req,res)=>{
    res.render("adminlogin")
})

app.post("/studentreg",async(req,res)=>{
    // const {username,email,password} = req.body;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPsw = await bcrypt.hash(password,12);
    const student = new RegisterModel({
        username:username,
        email:email,
        password:hashedPsw
    });
    RegisterModel.findOne({email:email})
    .then((data)=>{
        try{
            if(data){
                res.redirect("/studentlogin")
            }
            else{
                student.save()
                res.redirect("/studentlogin")
            }
        }
        catch{
            console.log(err);
        }
    })
    
})

app.post("/studentlog",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
   
    const student =await RegisterModel.findOne({email:email})
   
    if(!student){
        res.redirect("/sturegis")
    }else{
    const isMatch = await bcrypt.compare(password,student.password)
     if(!isMatch){
            res.write("<div style='margin:auto; align-items:center;margin-top:50px;width:24%;height:15%;padding:10px;'><h1 style='margin-top:4px'>Invalid credentials<br><a href='/studentlogin'>Back to Login Page</a></h1></div>")
        }
        else{
            res.cookie("Userstatus",email)
            localStorage.setItem(email,JSON.stringify(student))
            res.redirect("/")
        }
    }
    })



app.listen(5000,()=>{
    console.log("Listening on 5000");
}
);