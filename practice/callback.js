'use strict';

// hoisting : var, function declaration
//Synchronous callback

class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(()=>{
            if(
                (id==='sieon' && password ==='dream') ||
                (id==='coder' && password ==='academy')
            ){
                onSuccess(id)
            }else{
                onError(new Error('not found'))
            }
        }, 2000)
    }
    
    getRoles(user, onSuccess, onError){
        if(user==='sieon'){
            onSuccess({name : 'sieon', role : 'admin'})
        } else {
            onError(new Error('no access'))
        }
    }
}

const userStorage = new UserStorage()
const id = prompt('enter your name')
const password = prompt('enter your password')
userStorage.loginUser(
    id,
    password,
    (user)=>{
        userStorage.getRoles(
            user, 
            (userWithRole)=>{
                console.log(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`)
            },
            (error)=>{
            console.error(error)
            }
        )
    },
    (error)=>{
        console.error(error)
    }
)

