var Baccarat=require('./Baccarat')
var _=require('lodash')

var total=0
var fs=require('fs')
var points=JSON.parse(fs.readFileSync('calculate.txt',{encoding:'utf-8'}))


var table={
    1:1,
    2:1,
    3:1,
    4:2,
    5:-1,
    6:-2,
    7:-1,
    8:-1,
    9:0,
    0:0
}
var RC=0
var TC=0
var deck=8


function Dragon(times){
    // console.log('run '+times+' times')
    var bankerWin=0
    var playerWin=0
    var tieWin=0
    var dragonWin=0
    var totalhands=0
    var bethands=0
    var round=0
    var dragonPerShoe={}
    for(let i=0;i<times;i++){
        let r=Baccarat()
        TC=RC=0
        deck=8
        round=0
        let dragon=0
        // console.log(r)
        let playerPoint,bankerPoint
        while(true){
            hand=r.shift()
            if(hand){


                bankerPoint=points[hand[1].toString()]
                playerPoint=points[hand[0].toString()]
                if(dragon>=2){
                    totalhands+=1
                    if(bankerPoint>playerPoint){
                        if(hand[1].length===3&&bankerPoint===7){
                            dragon+=1
                            dragonWin+=1
                        }else{
                            bankerWin+=1

                        }
                    }else if(bankerPoint===playerPoint){
                        tieWin+=1
                    }else{
                        playerWin+=1
                    }
                }else{
                    if(bankerPoint>playerPoint){
                        if(hand[1].length===3&&bankerPoint===7){
                            dragon+=1
                        }
                    }
                }


                // getCount(hand)
            }else{
                if(dragonPerShoe[dragon]===undefined){
                    dragonPerShoe[dragon]=1
                }else{
                    dragonPerShoe[dragon]+=1
                }
                break
            }

        }

    }

    console.log(playerWin,tieWin,bankerWin,total)
    console.log((playerWin*2+tieWin)/totalhands-1,(bankerWin*2+tieWin+dragonWin)/totalhands-1)
    _.forEach(dragonPerShoe,function(val,key){
        dragonPerShoe[key]/=times
    })
    console.log(dragonPerShoe)


}

function Dragon7(times,target){
    var bankerWin=0
    var playerWin=0
    var tieWin=0
    var totalhands=0
    var round=0
    for (let i=0;i<times;i++){
        let r=Baccarat(deck=8,cutcard=14,burnCard=true)
        let playerPoint,bankerPoint,hand
        round=0
        RC=TC=0
        deck=8
        while(true){
            hand=r.shift()

            if(hand){
                round+=1
                totalhands+=1
                

                // if(TC<2&&betWin===0)


                bankerPoint=points[hand[1].toString()]
                playerPoint=points[hand[0].toString()]
                if(bankerPoint>playerPoint){
                    if(hand[1].length===3&&bankerPoint===7){
                        tieWin+=1
                    }else{
                        bankerWin+=1

                    }

                }else if(bankerPoint===playerPoint){
                    tieWin+=1
                }else{

                    playerWin+=1

                }



                // getCount(hand)




            }else{
                break
            }

        }
    }
    total=bankerWin+playerWin+tieWin
    // console.log('TC is '+target)
    console.log((bankerWin*2+tieWin)/total-1)
    // console.log(betWinTotal)
    // console.log(playerWin/total*0.018)
}



function regular(times,line){
    // console.log('run '+times+' times')
    var bankerWin=0
    var playerWin=0
    var tieWin=0
    var totalhands=0
    var bethands=0
    var round=0
    for(let i=0;i<times;i++){
        let r=Baccarat()
        TC=RC=0
        deck=8
        round=0
        // console.log(r)
        let playerPoint,bankerPoint
        while(true){
            hand=r.shift()
            if(hand){
                totalhands+=1
                round+=1

                    bethands+=1
                    bankerPoint=points[hand[1].toString()]
                    playerPoint=points[hand[0].toString()]
                    if(bankerPoint>playerPoint){
                        bankerWin+=1
                    }else if(bankerPoint===playerPoint){
                        tieWin+=1
                    }else{
                        playerWin+=1
                    }

                // getCount(hand)
            }else{
                break
            }

        }

    }
    total=bankerWin+playerWin+tieWin
    console.log(playerWin,tieWin,bankerWin,total)
    console.log((playerWin*2+tieWin)/total-1,(bankerWin*1.95+tieWin)/total-1,bethands/totalhands)


}
let totalhands=0
function insurance(times,line){
    // console.log('run '+times+' times')

    var bankerWin=0
    var playerWin=0
    var tieWin=0
    // const twoCardsBanker={}
    // const twoCardsPlayer={}
    // const threeCardsBanker={}
    // const threeCardsPlayer={}
    const bankerInsurance4={}
    var round=0
    for(let i=0;i<times;i++){
        let r=Baccarat()
        // TC=RC=0
        // deck=8
        // round=0
        // console.log(r)

        while(true){
            const hand=r.shift()
            if(hand){
                totalhands+=1
                // round+=1

                // bethands+=1
                const banker=hand[1]
                const player=hand[0]
                const bankerTwoPoints=points[banker.slice(0,2).toString()]
                const playerTwoPoints=points[player.slice(0,2).toString()]
                const bankerPoint=points[hand[1].toString()]
                const playerPoint=points[hand[0].toString()]

                //two cards banker

                {
                    if(player.length===3){
                        const key=[bankerTwoPoints,playerTwoPoints].toString()
                        // console.log(key)
                        if(bankerInsurance4[key]===undefined){
                            bankerInsurance4[key]={win:0,lose:0,tie:0}
                        }
                        if(bankerPoint>playerPoint){
                            bankerInsurance4[key].win+=1
                        }else if(bankerPoint===playerPoint){
                            bankerInsurance4[key].tie+=1
                        }else{
                            bankerInsurance4[key].lose+=1
                        }
                    }



                }

                // getCount(hand)
            }else{
                break
            }

        }

    }
    // console.log(bankerInsurance4)
    _.forEach(bankerInsurance4,function(obj,key){
        bankerInsurance4[key].odd=(bankerInsurance4[key].win/bankerInsurance4[key].lose).toFixed(2)
        bankerInsurance4[key].per=((bankerInsurance4[key].win+bankerInsurance4[key].lose+bankerInsurance4[key].tie)*100/totalhands).toFixed(2)
    })
    console.log(bankerInsurance4)
    // total=bankerWin+playerWin+tieWin
    // console.log(playerWin,tieWin,bankerWin,total)
    // console.log((playerWin*2+tieWin)/total-1,(bankerWin*1.95+tieWin)/total-1,bethands/totalhands)


}

function getCount(arr){
    // console.log(arr)
    deck=arr[2]
    var temp=[...arr[0],...arr[1]]
    _.forEach(temp,function(item){
        RC+=table[item]
    })
    TC=RC/deck



}

console.log('regular')
console.log(insurance(2000000))


// Dragon7(50000,0)
// for(let i=0;i>=-9;i--){
//     console.log('TC =',i-1,' to ',i)
//     regular(10000000,i)
// }

// regular(1000000)




