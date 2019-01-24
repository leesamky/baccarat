const result={}
for(let i=0;i<=13;i++){

    for(let j=0;j<=13;j++){
        let card=[i,j]
        result[[i,j].toString()]=cal([i,j])
    }

}

for(let i=0;i<=13;i++){

    for(let j=0;j<=13;j++){
        for(let k=0;k<=13;k++){
            if(result[[i,j].toString()]<7){
                result[[i,j,k].toString()]=cal([i,j,k])
            }

        }
    }

}

console.log(result)
const fs=require('fs')
fs.writeFileSync('faceCard.txt',JSON.stringify(result,null,2))

function cal(list){
    if(list.length>3){
        console.log('list larger than 3')
        return
    }
    let total=0
    for(let i=0;i<list.length;i++){
        if(list[i]<10){
            total+=list[i]
        }

    }
    while(total>=10){
        total-=10
    }
    return total
}