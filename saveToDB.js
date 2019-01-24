const Baccarat=require('./BaccaratFaceCard')
const Shoe=require('./db/schema')
const async=require('async')
const tenThousandShoes=[]

console.time('10000shoes')

for(let i=0;i<10000;i++){
    tenThousandShoes.push({shoe:Baccarat()})
}
console.timeEnd('10000shoes')

console.time('saveToDB')

Shoe.create(tenThousandShoes)
    .then((result)=>{
        console.log('ok')
        console.timeEnd('saveToDB')

    })
    .catch((error)=>{
        console.log(error)
    })


