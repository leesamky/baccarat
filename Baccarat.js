var fs=require('fs')
var points=JSON.parse(fs.readFileSync('calculate.txt',{encoding:'utf-8'}))
var _=require('lodash')
var last=false
var newShoe=require('./shoe')

function Baccarat(deck=8,cutcard=54,burnCard){
    var shoe=newShoe(deck,cutcard,burnCard)
    last=false
    var result=[]
    while(true){
        let r=round(shoe)
        if(r){
            result.push(r)
        }else{
            break
        }
    }
    return result
}
function round(shoe,showShoesLeft=false,burnCard=true){
    let banker=[]
    let player=[]
    let bankerPoint
    let playerPoint
    let playerThirdCard
    if(!last){
        if(burnCard){
            drawCard((shoe))
        }
        player.push(drawCard(shoe))
        banker.push(drawCard(shoe))
        player.push(drawCard(shoe))
        banker.push(drawCard(shoe))
        bankerPoint=points[banker.toString()]
        playerPoint=points[player.toString()]
        if(bankerPoint>=8||playerPoint>=8){
            if(showShoesLeft){
                return [player,banker,shoe.length/52]
            }else{
                return [player,banker]
            }

        }else if(playerPoint<=5){
            playerThirdCard=drawCard(shoe)
            player.push(playerThirdCard)
            drawThirdCard(shoe,playerThirdCard,banker,bankerPoint)
            if(showShoesLeft){
                return [player,banker,shoe.length/52]
            }else{
                return [player,banker]
            }
        }else{//player does not draw third card
            if(bankerPoint<=5){
                banker.push(drawCard(shoe))
            }
            if(showShoesLeft){
                return [player,banker,shoe.length/52]
            }else{
                return [player,banker]
            }
        }
    }else{//end of the shoe
        return undefined
    }
}

function drawThirdCard(shoe,playerThirdCard,banker,bankerPoint){
    if(bankerPoint<=2){
        banker.push(drawCard(shoe))
    }
    else if(bankerPoint===3&&playerThirdCard!=8){
        banker.push(drawCard(shoe))
    }
    else if(bankerPoint===4&&(playerThirdCard>=2&&playerThirdCard<=7)){
        banker.push(drawCard(shoe))
    }
    else if(bankerPoint===5&&(playerThirdCard>=4&&playerThirdCard<=7)){
        banker.push(drawCard(shoe))
    }
    else if(bankerPoint===6&&(playerThirdCard===6||playerThirdCard===7)){
        banker.push(drawCard(shoe))
    }
}

function drawCard(shoe){
    let card=shoe.pop()
    if(card===undefined){
        last=true
        card=shoe.pop()
    }
    return card


}

module.exports=Baccarat