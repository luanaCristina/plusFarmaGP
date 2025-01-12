// importando o nosso express
const express = require('express')
const assert = require('assert');
//const ObjectId = require("mongodb").ObjectId;
const app = express()
const port = 3001

app.listen(process.env.PORT || port, () => {
  console.log("app está rodando na porta" + port)
})

app.use(express.urlencoded({extended:true}))


// conectando o banco de dados

const MongoClient = require('mongodb').MongoClient;


// Connection URL
const uri = `${process.env.DATABASE_URL}`;
// Database Name
const db = 'bancoPlus';
// Use connect method to connect to the Server passing in
// additional options
MongoClient.connect(uri, {
  poolSize: 10, ssl: true
}, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  client.close();
});
    //app.listen(8080 , () =>{
     //console.log("rodando safe")
    //})
//})


// static file
app.use(express.static('public'))
app.use('/css', express.static(__dirname +'public/css'))
app.use('/js', express.static(__dirname +'public/js'))
app.use('/img', express.static(__dirname +'public/img'))

//set views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/home', (req,res) =>{
    res.render('home')
})
app.get('/login', (req,res) =>{
    res.render('login')
})
app.get('/RecSenha', (req,res) =>{
    res.render('RecSenha')
})
app.get('/register', (req,res) =>{
    res.render('register')
})

app.post('/show',(req,res)=>{
    console.log(req.body)
})

app.get('/', (req,res) =>{
    let cursor = db.collection('clientePlus').find()
})

app.post('/register',(req,res) =>{
    db.collection("clientePlus").insertOne(req.body,(err,result) => {
        if(err) return console.log(err)
        console.log("salvou no nosso banco")
        res.redirect("/register")
        db.collection("clientePlus").find().toArray((err,results)=>{
            console.log(results)
        })
    })
})


//permitir servidor se comunicar com o navegador


