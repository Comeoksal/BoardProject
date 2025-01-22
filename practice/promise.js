
//promise is a Javascript object for asynchronous operation
//State pending -> fulfilled or rejected
//Producer & Cpromise

//Producer
// when new Promise is created, the executor runs automatically.
const promise = new Promise((resolve, reject) => {
    console.log('doing something...')
    setTimeout(() => {
        resolve('Success')
    }, 2000)
    reject(new Error('no network'))
})
promise
    .then((value) => {
        console.log(value)
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => {
        console.log('finally')
    })