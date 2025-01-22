//async & await
//clear style of using promise

//async
//async 키워드가 앞에 있는 함수는 return 값이 promise 방식으로 비동기 처리됨
async function fetchUser(){
    return 'sieon'
}

const user = fetchUser()
console.log(user)
//user.then(console.log)

//await
function delay(ms){
    return new Promise(resolve=> setTimeout(resolve, ms))
}

async function getApple(){
    await delay(2000)
    return 'Apple'
}

async function getBanana(){
    await delay(2000)
    return 'Banana'
}
//async로 간단화하기
async function pickFruits_async(){
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise
    const banana = await bananaPromise
    return `${apple} + ${banana}`
}
//Promise 지옥
function pickFruits_promise(){
    return getApple()
    .then(apple=>{
        return getBanana()
        .then(banana=> `${apple} + ${banana}`)
    })
}

function pickAllFruit(){
    return Promise.all([getApple(), getBanana()])
    .then(fruits=>fruits.join('+'))
}
function pickFirstOne(){
    return Promise.race([getApple(), getBanana()])
}
pickAllFruit().then(console.log)
pickFirstOne().then(console.log)