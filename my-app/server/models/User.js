const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { TopologyDescription } = require('mongodb');

const userSchema = mongoose.Schema({
    name: {
        type : String,
        maxlength : 50,
    },
    email: {
        type : String,
        trim : true,
        unique : 1,
    },
    password: {
        type : String,
        maxlength : 100,
    },
    lastname: {
        type : String,
        maxlength : 50,
    },
    role: {
        type : Number,
        default : 0,
    },
    image: String,
    token: {
        type : String,
    },
    tokenExp: {
        type : Number,
    },
})

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, (err, salt)=>{
            if(err) return next(err)
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword){
    //plainPassword 123456 과 암호화된 코드 비교
    //plainPassword를 암호화 하여 비교 (암호화된 코드 복호화 안 됨)
    const user = this;
    return new Promise((resolve, reject)=>{
        bcrypt.compare(plainPassword, user.password, (err, isMatch)=>{
            if(err) return reject(err);
            resolve(isMatch);
        })
    })
}

userSchema.methods.generateToken = async function(){
    var user = this;
    //json web token 사용해서 토큰 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    try{
        await user.save()
        return user.token
    } catch(err){
        throw err
    }
}

userSchema.methods.findbyToken = async function(token){
    try{
        const decoded = jwt.verify(token, 'secretToken')
        const user = await this.constructor.findOne({ "_id": decoded, "token": token });
        return user;
    } catch(err){
        throw err
    }
}
const User = mongoose.model('User', userSchema);

module.exports = { User };