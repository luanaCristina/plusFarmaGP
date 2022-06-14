// importando o nosso express
const express = require('express')
//const { ObjectId } = require("mongodb");
const app = express()

app.use(express.urlencoded({extended:true}))

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);

// conectando o banco de dados

const MongoClient =require('mongodb').MongoClient
const uri = "mongodb+srv://dbUser:dbUser@cluster0.rcapfpn.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(uri,(err, client) =>{
    if(err) return console.log(err)
    db = client.db('bancoPlus')

    //app.listen(3000 , () =>{
    //    console.log("rodando safe")
    //})
})


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


