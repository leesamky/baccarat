var cards=[1,2,3,4,5,6,7,8,9,0,0,0,0]
var oneDeck=[]
var _=require('lodash')
for(let i=0;i<4;i++){
    oneDeck=oneDeck.concat(cards)
}
var oneShoe=[]

function Shoe(deck=8,cutcard=14,burnCard=true){
    if(oneShoe.length!=oneDeck.length*deck){
        oneShoe=[]
        for(let i=0;i<deck;i++){
            oneShoe=oneShoe.concat(oneDeck)
        }
    }
    oneShoe=_.shuffle(oneShoe)
    var shoe=_.clone(oneShoe)
    shoe.splice(cutcard,0,undefined)
    if(burnCard){
        let card=shoe.pop()

        if(card===0){
            card=10
        }
        for(i=0;i<card;i++){
            shoe.pop()
        }
    }
    return shoe



}

module.exports=Shoe

