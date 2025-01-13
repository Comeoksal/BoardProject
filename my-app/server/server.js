//MongoDB + Node.js 접속 코드
const mongoose = require('mongoose');
const config = require('./config/dev');
mongoose.connect(config.mongoURI).then(()=>console.log('MongoDb Connected...')).catch(err=>console.log(err));

const { User } = require("./User");
//MySQL + Node.js 접속 코드
var mysql = require("mysql");
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "050329",
    database: "myboard",
});
conn.connect();

//express 연동
const express = require('express');
const app = express();
const port = 5000;
//Body-Parser Dependency 연동
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.listen(port, (req, res) =>{
    console.log(`Server running at ${port}`);
})
app.get('/', (req, res) =>{
    res.send('Hello World! Sieon!!');
})
app.post('/register', (req, res) =>{
    //회원가입 할 때 필요한 정보들을 client에서 가져오면 데이터베이스에 넣는다다.
    const user = new User(req.body)

    user.save() 
    .then((doc) => {
        res.status(200).json({ success: true, doc });
    })
    .catch((err) => {
        res.status(400).json({ success: false, err });
    });
})