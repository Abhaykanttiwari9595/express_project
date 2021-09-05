const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/registers");
const {json} = require("express");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));

app.set("view engine","hbs");
app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("register");
});

//create a new user in our database
app.post("/register",async(req,res) =>{
    try{
        const password = req.body.password;
        const cpassword = req.body. confirmpassword ;
        if(password === cpassword){
            const registerEmployee = new Register({
                email:req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching")
        }
    }catch(error){
        res.status(400).send(error)
    }
})
app.get("/contact",(req,res)=>{
    res.render("contact");
});

const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");
app.set("views",template_path);
hbs.registerPartials(partial_path);

app.get("/",(req,res)=>{
    res.send("hello from the express js");
});
app.listen(port, () => {
    console.log("server is running port number 3000");
});