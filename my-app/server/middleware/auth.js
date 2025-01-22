const { User } = require('../models/User')

let auth = async (req, res, next) => {
    //인증 처리
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth
    // 토큰을 복호화한 후 유저를 찾는다.
    try{
        const foundUser = new User()
        const user = await foundUser.findbyToken(token)
        if(!user){
            return res.json({isAuth : false, error : true })
        }
        req.token = user.token
        req.user = user
        next()
    } catch(err){
        throw err
    }
    // 1.유저가 있으면 인증 ok
    // 2.유저가 없으면 인증 no
}

module.exports = { auth }