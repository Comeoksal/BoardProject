//MongoDB + Node.js 접속 코드
const mongoose = require('mongoose');
const url = 'mongodb+srv://keumsiun0503:050329@ksieon.f3bwl.mongodb.net/?retryWrites=true&w=majority&appName=KSieon';
mongoose.connect(url).then(()=>console.log('MongoDb Connected...')).catch(err=>console.log(err));

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

app.get('/', (req, res) =>{
    res.send('Hello World!');
})
//body-parser 연동
const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.listen(port, (req, res) =>{
    console.log(`Server running at ${port}`);
})

//데이터 저장 엔드포인트
app.post('/save1', (req, res) =>{
    const { content } = req.body;

    if(!content){
        return res.status(400).json({error : "문장이 비어있습니다." });
    }

    const query = "insert into my_table(content) values(?)"

    conn.query(query, [content], (err, result)=>{
        if (err) {
            console.error("DB 저장 중 에러 발생:", err);
            return res.status(500).json({ error: "데이터베이스 오류" });
        }

        res.status(200).json({ message: "문장이 저장되었습니다!", id: result.insertId });
    })
})

app.post('/save2', (req, res) =>{
    const { comment } = req.body;

    if(!comment){
        return res.status(400).json({error : "문장이 비어있습니다." });
    }

    const query = "insert into my_table(content) values(?)"

    conn.query(query, [comment], (err, result)=>{
        if (err) {
            console.error("DB 저장 중 에러 발생:", err);
            return res.status(500).json({ error: "데이터베이스 오류" });
        }

        res.status(200).json({ message: "문장이 저장되었습니다!", id: result.insertId });
    })
})

app.get('/save2', (req, res) =>{
    const query = "select * from my_table";
    conn.query(query, (err, rows)=>{
        if (err) {
            console.error("DB에서 댓글을 가져오는 중 오류 발생:", err);
            return res.status(500).json({ error: "데이터베이스 오류" });
        }
        res.status(200).json(rows); // JSON 형식으로 댓글 데이터 반환
    })
})

app.get('/list', function(req, res){
    conn.query("select * from post", function(err, rows, fields){
        if(err) throw err;
        console.log(rows);
    });
})
app.get('/list2', (req, res)=>{
    mydb.collection('post').find().toArray().then(result=>{
        console.log(result);
    });
})