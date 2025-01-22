'use strict';

// hoisting : var, function declaration
//Synchronous callback

class UserStorage{
    loginUser(id, password){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if(
                    (id==='sieon' && password ==='dream') ||
                    (id==='coder' && password ==='academy')
                ){
                    resolve(id)
                }else{
                    reject(new Error('not found'))
                }
            }, 2000)
        })
    }
    getRoles(user){
        return new Promise((resolve, reject)=>{
            if(user==='sieon'){
                resolve({name : 'sieon', role : 'admin'})
            } else {
                reject(new Error('no access'))
            }
        })
    }
}

const userStorage = new UserStorage()
const id = prompt('enter your name')
const password = prompt('enter your password')
userStorage.loginUser(id, password)
    .then(user=>userStorage.getRoles(user))
    .then(userWithRole=>console.log(`Hello!! ${userWithRole.name}, you have a ${userWithRole.role} role`))
    .catch(console.log)