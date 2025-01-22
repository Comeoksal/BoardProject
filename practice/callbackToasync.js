'use strict';
// hoisting : var, function declaration
class UserStorage {
    async loginUser(id, password) {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(2000)
        if (
            (id === 'sieon' && password === 'dream') ||
            (id === 'coder' && password === 'academy')
        ) {
            return id
        }
        else {
            throw new Error('not found')
        }
    }
    async getRoles(user) {
        try {
            if (user === 'sieon') {
                return ({ name: 'sieon', role: 'admin' })
            } else {
                throw new Error('unknown access')
            }
        } catch (err) {
            throw err
        }
    }
}
const userStorage = new UserStorage()
const id = prompt('enter your name')
const password = prompt('enter your password')
userStorage.loginUser(id, password)
    .then(user => userStorage.getRoles(user))
    .then(userWithRole => console.log(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`))
    .catch(console.log)