var express = require('express')  
var app = express() 
const request = require('request');
const port = 3001

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./keys.json");

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.get('/home', function (req, res){  
    res.render("home")  
});
app.get('/homenav', function (req, res){  
    res.render("home")  
});

app.get('/signup', function (req, res){
    res.render("signupp")
});
    
    app.get("/signupnav", (req,res) => {
        res.render("signupp");
    })
    app.get("/signupsubmit",(req,res)=>{
        const email = req.query.email;
        const password = req.query.password;
        db.collection("Users").add({
            Email : email,
            Password : password,
        }).then(()=>{
            res.render("loginp");
        });
    });
    
    app.get('/login', function (req, res){
        res.render("loginp")
    });
    
    app.get("/loginnav", function(req,res) {
        res.render("loginp");
    })
    
    app.get("/loginsubmit",function(req,res){
        db.collection("Users").get().then(function(docs){
        const email = req.query.email;
        const password = req.query.password;
        db.collection("Users")
        .where("Email","==",email)
        .where("Password","==",password)
        .get()
    
        .then((docs) => {
            console.log(email);
            console.log(password);
            if(docs.size > 0){
                res.render("home");
            }
            else{
                res.render("signupp");
            }  
            });
        })
});

app.get('/horror', function (req, res){
    res.render("h")
});
app.get('/comedy', function (req, res){
    res.render("c")
});
app.get('/inspirational', function (req, res){
    res.render("i")
});
app.get('/fiction', function (req, res){
    res.render("f")
});
app.get('/upsc', function (req, res){
    res.render("u")
});


app.listen(3001, function () {  
console.log('Example app listening on port 3001!')  
})