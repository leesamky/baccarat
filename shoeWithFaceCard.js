const cards=[1,2,3,4,5,6,7,8,9,10,11,12,13]
let oneDeck=[]
const _=require('lodash')
for(let i=0;i<4;i++){
    oneDeck=oneDeck.concat(cards)
}
let oneShoe=[]

function Shoe(deck=8,cutCard=14){
    if(oneShoe.length!=oneDeck.length*deck){
        oneShoe=[]
        for(let i=0;i<deck;i++){
            oneShoe=oneShoe.concat(oneDeck)
        }
    }
    oneShoe=_.shuffle(oneShoe)
    const shoe=_.clone(oneShoe)
    shoe.splice(cutCard,0,undefined)
    let burnCard=shoe.pop()

    if(burnCard>=10){
        burnCard=10
    }
    for(let i=0;i<burnCard;i++){
        shoe.pop()
    }

    return [shoe,burnCard]



}

module.exports=Shoe

