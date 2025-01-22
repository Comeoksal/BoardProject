//MongoDB + Node.js 접속 코드
const mongoose = require('mongoose');
const config = require('./config/dev');
mongoose.connect(config.mongoURI).then(() => console.log('MongoDb Connected...')).catch(err => console.log(err));

const { User } = require("./models/User");
const { auth } = require('./middleware/auth')
//express 연동
const express = require('express');
const app = express();
const port = 5000;
//Body-Parser Dependency 연동
//const bodyparser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cookieparser = require('cookie-parser');
app.use(cookieparser());

app.listen(port, (req, res) => {
    console.log(`Server running at ${port}`);
})
app.get('/', (req, res) => {
    res.send('Hi')
})
app.post('/api/users/register', (req, res) => {
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

app.post('/api/users/login', async (req, res) => {
    try {
        // 1. 요청된 이메일을 DB에서 찾기
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }

        // 2. 비밀번호 확인
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.json({
                loginSuccess: false,
                message: "비밀번호가 틀렸습니다."
            });
        }

        // 3. 토큰 생성
        const token = await user.generateToken();

        // 4. 토큰을 쿠키에 저장
        res.cookie("x_auth", token)
            .status(200)
            .json({
                loginSuccess: true,
                userId: user._id
            });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ loginSuccess: false, message: "서버 에러 발생" });
    }
})

app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 것은 Authentication : true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
        if (!user) {
            throw err
        } else {
            return res.status(200).send({ success: true })
        }
    } catch (err) {
        throw err
    }
})