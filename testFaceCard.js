const Baccarat=require('./BaccaratFaceCard')
const _=require('lodash')
const xl=require('excel4node')
var ws

var total=0
const fs=require('fs')
const points=JSON.parse(fs.readFileSync('faceCard.txt',{encoding:'utf-8'}))

let RC=0
let TC=0


let deck=8


function Dragon(times){
    // console.log('run '+times+' times')
    var bankerWin=0
    var playerWin=0
    var tieWin=0
    var dragonWin=0
    var totalhands=0
    var bethands=0
    var round=0
    var dragonPerShoe={
            win:0,
            tie:0,
            lose:0
        }
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
    var bankerTie=0
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
                        bankerTie+=1
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
    // total=bankerWin+playerWin+tieWin
    // console.log('TC is '+target)
    console.log(bankerWin,playerWin,tieWin)
    console.log((bankerWin*2+tieWin+bankerTie)/totalhands-1,(playerWin*2+tieWin)/totalhands-1)
    // console.log(betWinTotal)
    // console.log(playerWin/total*0.018)
}



function regular(times,line,rolling=0){
    // console.log('run '+times+' times')
    let bankerWin=0
    let playerWin=0
    let tieWin=0
    let totalHands=0

    let betHands=0
    let round=0
    let hand=undefined
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

                totalHands+=1
                round+=1

                betHands+=1

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
    // console.log(totalhands,bankerSuit,100*(bankerSuit/totalhands),playerSuit,100*(playerSuit/totalhands))
    console.log((playerWin*2+tieWin+bankerWin*rolling)/total-1,(bankerWin*1.95+tieWin+playerWin*rolling)/total-1,betHands/totalHands)


}



function Super6(times,line){
    console.log(`run ${times} times Super6`)
    var bankerWin=0
    var playerWin=0
    var tieWin=0
    var totalhands=0
    var bankerSuit=0
    var playerSuit=0
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
                // if((hand[1].length===3)&&(hand[1][0]===hand[1][1])&&(hand[1][0]===hand[1][2])){
                //
                //     bankerSuit+=1
                // }
                // if((hand[0].length===3)&&(hand[0][0]===hand[0][1])&&(hand[0][0]===hand[0][2])){
                //
                //     playerSuit+=1
                // }
                bankerPoint=points[hand[1].toString()]
                playerPoint=points[hand[0].toString()]
                if(bankerPoint>playerPoint){
                    if(bankerPoint===6){
                        bankerWin+=0.75
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
    // console.log(totalhands,bankerSuit,100*(bankerSuit/totalhands),playerSuit,100*(playerSuit/totalhands))
    console.log((playerWin*2+tieWin)/totalhands-1,(bankerWin*2+tieWin)/totalhands-1,bethands/totalhands)


}


{
    var wb= new xl.Workbook()
    var ws= wb.addWorksheet('Two Cards Insurance')
    var style = wb.createStyle({
        font: {
            color: '#FF0800',
            size: 12,
        }
    });
}


let totalhands=0
// function insurance(times,line){
//     // console.log('run '+times+' times')
//
//     var bankerWin=0
//     var playerWin=0
//     var tieWin=0
//     // const twoCardsBanker={
//             win:0,
//             tie:0,
//             lose:0
//         }
//     // const twoCardsPlayer={
//             win:0,
//             tie:0,
//             lose:0
//         }
//     // const threeCardsBanker={
//             win:0,
//             tie:0,
//             lose:0
//         }
//     // const threeCardsPlayer={
//             win:0,
//             tie:0,
//             lose:0
//         }
//     const twoCardsInsurance={
//             win:0,
//             tie:0,
//             lose:0
//         }
//     const bankerInsurance4={
//             win:0,
//             tie:0,
//             lose:0
//         }
//     const playerInsurance4={
//             win:0,
//             tie:0,
//             lose:0
//         }
//     const bankerInsurance5={
//             win:0,
//             tie:0,
//             lose:0
//         }
//     const playerInsurance5={
//             win:0,
//             tie:0,
//             lose:0
//         }
//     var round=0
//     for(let i=0;i<times;i++){
//         let r=Baccarat()
//         // TC=RC=0
//         // deck=8
//         // round=0
//         // console.log(r)
//
//         while(true){
//             const hand=r.shift()
//             if(hand){
//                 totalhands+=1
//                 // round+=1
//
//                 // bethands+=1
//                 const banker=hand[1]
//                 const player=hand[0]
//                 const bankerTwoPoints=points[banker.slice(0,2).toString()]
//                 const playerTwoPoints=points[player.slice(0,2).toString()]
//                 const bankerPoint=points[hand[1].toString()]
//                 const playerPoint=points[hand[0].toString()]
//
//                 // two cards 7,8,9
//                 {
//                     if(bankerTwoPoints>=7){
//                         if(twoCardsInsurance[bankerTwoPoints]===undefined){
//                             twoCardsInsurance[bankerTwoPoints]={win:0,lose:0,tie:0}
//                         }
//                         if(playerPoint>bankerPoint ){
//                             twoCardsInsurance[bankerTwoPoints].win+=1
//                         }else if(playerPoint===bankerPoint){
//                             twoCardsInsurance[bankerTwoPoints].tie+=1
//                         }else{
//                             twoCardsInsurance[bankerTwoPoints].lose+=1
//                         }
//                     }
//
//                     if(playerTwoPoints>=7){
//                         if(twoCardsInsurance[playerTwoPoints]===undefined){
//                             twoCardsInsurance[playerTwoPoints]={win:0,lose:0,tie:0}
//                         }
//                         if(bankerPoint>playerPoint ){
//                             twoCardsInsurance[playerTwoPoints].win+=1
//                         }else if(playerPoint===bankerPoint){
//                             twoCardsInsurance[playerTwoPoints].tie+=1
//                         }else{
//                             twoCardsInsurance[playerTwoPoints].lose+=1
//                         }
//                     }
//                 }
//
//                 //two cards banker
//
//                 {
//                     if((player.length===3)&&(bankerTwoPoints>playerTwoPoints)){
//                         const key=[bankerTwoPoints,playerTwoPoints].toString()
//                         // console.log(key)
//                         if(bankerInsurance4[key]===undefined){
//                             bankerInsurance4[key]={win:0,lose:0,tie:0,bankerTwo:bankerTwoPoints,playerTwo:playerTwoPoints}
//                         }
//                         if(bankerPoint<playerPoint){
//                             bankerInsurance4[key].win+=1
//                         }else if(bankerPoint===playerPoint){
//                             bankerInsurance4[key].tie+=1
//                         }else{
//                             bankerInsurance4[key].lose+=1
//                         }
//                     }
//
//
//
//                 }
//
//                 //two cards player
//
//                 {
//                     if((bankerTwoPoints<playerTwoPoints)&&(playerTwoPoints<=7)){
//                         const key=[playerTwoPoints,bankerTwoPoints].toString()
//                         // console.log(key)
//                         if(playerInsurance4[key]===undefined){
//                             playerInsurance4[key]={win:0,lose:0,tie:0,bankerTwo:bankerTwoPoints,playerTwo:playerTwoPoints}
//                         }
//                         if(bankerPoint>playerPoint){
//                             playerInsurance4[key].win+=1
//                         }else if(bankerPoint===playerPoint){
//                             playerInsurance4[key].tie+=1
//                         }else{
//                             playerInsurance4[key].lose+=1
//                         }
//                     }
//
//
//
//                 }
//
//                 //three cards player
//                 {
//                     if((bankerTwoPoints<playerPoint)&&(banker.length===3)&&(player.length===3)){
//                         const key=[playerPoint,bankerTwoPoints].toString()
//                         // console.log(key)
//                         if(playerInsurance5[key]===undefined){
//                             playerInsurance5[key]={win:0,lose:0,tie:0,bankerTwo:bankerTwoPoints,playerThree:playerPoint}
//                         }
//                         if(bankerPoint>playerPoint){
//                             playerInsurance5[key].win+=1
//                         }else if(bankerPoint===playerPoint){
//                             playerInsurance5[key].tie+=1
//                         }else{
//                             playerInsurance5[key].lose+=1
//                         }
//                     }
//                 }
//
//                 // getCount(hand)
//             }else{
//                 break
//             }
//
//         }
//
//     }
//
//     //save player insurance 5 to excel
//     {
//
//         _.forEach(playerInsurance5,function(obj,key){
//             playerInsurance5[key].winOdd=(playerInsurance5[key].win/(playerInsurance5[key].lose+playerInsurance5[key].win+playerInsurance5[key].tie)).toFixed(6)
//             playerInsurance5[key].tieOdd=(playerInsurance5[key].tie/(playerInsurance5[key].lose+playerInsurance5[key].win+playerInsurance5[key].tie)).toFixed(6)
//             playerInsurance5[key].frequency=((playerInsurance5[key].win+playerInsurance5[key].lose+playerInsurance5[key].tie)*100/totalhands).toFixed(6)
//         })
//
//         {
//
//             ws= wb.addWorksheet('Five Cards Player Insurance')
//
//             let row=2
//             {
//                 ws.cell(1,1)
//                     .string('Player Three Cards Point')
//                 ws.cell(1,2)
//                     .string('Banker Two Cards Point')
//                 ws.cell(1,3)
//                     .string('Win')
//                 ws.cell(1,4)
//                     .string('Tie')
//                 ws.cell(1,5)
//                     .string('Pay')
//                 ws.cell(1,6)
//                     .string('House Edge')
//                 ws.cell(1,7)
//                     .string('Frequncy')
//             }
//             _.forEach(playerInsurance5,function(obj,key){
//                 ws.cell(row,1)
//                     .string(obj.playerThree.toString())
//                 ws.cell(row,2)
//                     .string(obj.bankerTwo.toString())
//                 ws.cell(row,3)
//                     .number(Number(obj.winOdd))
//                 ws.cell(row,4)
//                     .number(Number(obj.tieOdd))
//                 ws.cell(row,7)
//                     .number(Number(obj.frequency))
//
//                 row++
//             })
//         }
//
//     }
//
//
//     //save banker Insurance 4 to excel
//
//     {
//         {
//             _.forEach(bankerInsurance4,function(obj,key){
//                 bankerInsurance4[key].winOdd=(bankerInsurance4[key].win/(bankerInsurance4[key].lose+bankerInsurance4[key].win+bankerInsurance4[key].tie)).toFixed(6)
//                 bankerInsurance4[key].tieOdd=(bankerInsurance4[key].tie/(bankerInsurance4[key].lose+bankerInsurance4[key].win+bankerInsurance4[key].tie)).toFixed(6)
//                 bankerInsurance4[key].frequency=((bankerInsurance4[key].win+bankerInsurance4[key].lose+bankerInsurance4[key].tie)*100/totalhands).toFixed(6)
//             })
//         }
//
//
//         {
//
//             ws= wb.addWorksheet('Four Cards Banker Insurance')
//
//             let row=2
//             {
//                 ws.cell(1,1)
//                     .string('Banker Two Cards Point')
//                 ws.cell(1,2)
//                     .string('Player Two Cards Point')
//                 ws.cell(1,3)
//                     .string('Win')
//                 ws.cell(1,4)
//                     .string('Tie')
//                 ws.cell(1,5)
//                     .string('Pay')
//                 ws.cell(1,6)
//                     .string('House Edge')
//                 ws.cell(1,7)
//                     .string('Frequncy')
//             }
//             _.forEach(bankerInsurance4,function(obj,key){
//                 ws.cell(row,1)
//                     .string(obj.bankerTwo.toString())
//                 ws.cell(row,2)
//                     .string(obj.playerTwo.toString())
//                 ws.cell(row,3)
//                     .number(Number(obj.winOdd))
//                 ws.cell(row,4)
//                     .number(Number(obj.tieOdd))
//                 ws.cell(row,7)
//                     .number(Number(obj.frequency))
//
//                 row++
//             })
//         }
//     }
//
//
//     // save player insurance 4 to excel
//     {
//         _.forEach(playerInsurance4,function(obj,key){
//             playerInsurance4[key].winOdd=(playerInsurance4[key].win/(playerInsurance4[key].lose+playerInsurance4[key].win+playerInsurance4[key].tie)).toFixed(6)
//             playerInsurance4[key].tieOdd=(playerInsurance4[key].tie/(playerInsurance4[key].lose+playerInsurance4[key].win+playerInsurance4[key].tie)).toFixed(6)
//             playerInsurance4[key].frequency=((playerInsurance4[key].win+playerInsurance4[key].lose+playerInsurance4[key].tie)*100/totalhands).toFixed(6)
//         })
//
//         {
//
//             ws= wb.addWorksheet('Four Cards Player Insurance')
//
//             let row=2
//             {
//                 ws.cell(1,1)
//                     .string('Player Two Cards Point')
//                 ws.cell(1,2)
//                     .string('Banker Two Cards Point')
//                 ws.cell(1,3)
//                     .string('Win')
//                 ws.cell(1,4)
//                     .string('Tie')
//                 ws.cell(1,5)
//                     .string('Pay')
//                 ws.cell(1,6)
//                     .string('House Edge')
//                 ws.cell(1,7)
//                     .string('Frequncy')
//             }
//             _.forEach(playerInsurance4,function(obj,key){
//                 ws.cell(row,1)
//                     .string(obj.playerTwo.toString())
//                 ws.cell(row,2)
//                     .string(obj.bankerTwo.toString())
//                 ws.cell(row,3)
//                     .number(Number(obj.winOdd))
//                 ws.cell(row,4)
//                     .number(Number(obj.tieOdd))
//                 ws.cell(row,7)
//                     .number(Number(obj.frequency))
//
//                 row++
//             })
//         }
//     }
//
//     //save First two cards to DB
//     {
//         _.forEach(twoCardsInsurance,function(obj,key){
//
//             twoCardsInsurance[key].winOdd=((twoCardsInsurance[key].win)/(twoCardsInsurance[key].tie+twoCardsInsurance[key].lose+twoCardsInsurance[key].win)).toFixed(6)
//             twoCardsInsurance[key].loseOdd=((twoCardsInsurance[key].lose)/(twoCardsInsurance[key].tie+twoCardsInsurance[key].lose+twoCardsInsurance[key].win)).toFixed(6)
//             twoCardsInsurance[key].tieOdd=((twoCardsInsurance[key].tie)/(twoCardsInsurance[key].tie+twoCardsInsurance[key].lose+twoCardsInsurance[key].win)).toFixed(6)
//
//
//             // bankerInsurance4[key].per=((bankerInsurance4[key].win+bankerInsurance4[key].lose+bankerInsurance4[key].tie)*100/totalhands).toFixed(2)
//         })
//
//         {
//             ws= wb.addWorksheet('Two Cards Insurance')
//             var style = wb.createStyle({
//                 font: {
//                     color: '#FF0800',
//                     size: 12,
//                 }
//             });
//             let row=2
//             {
//                 ws.cell(1,1)
//                     .string('Two Cards Point')
//                 ws.cell(1,2)
//                     .string('Win')
//                 ws.cell(1,3)
//                     .string('Tie')
//                 ws.cell(1,4)
//                     .string('Pay')
//                 ws.cell(1,5)
//                     .string('House Edge')
//             }
//             _.forEach(twoCardsInsurance,function(obj,point){
//                 ws.cell(row,1)
//                     .string(point)
//                 ws.cell(row,2)
//                     .number(Number(obj.winOdd))
//                 ws.cell(row,3)
//                     .number(Number(obj.tieOdd))
//
//                 row++
//             })
//             wb.write('Excel.xlsx')
//
//         }
//     }
//
//
//     // total=bankerWin+playerWin+tieWin
//     // console.log(playerWin,tieWin,bankerWin,total)
//     // console.log((playerWin*2+tieWin)/total-1,(bankerWin*1.95+tieWin)/total-1,bethands/totalhands)
//
//
// }

function getCount(arr,table){
    // console.log(arr)
    deck=arr[2]
    if(deck<1){
        deck=1
    }
    var temp=[...arr[0],...arr[1]]
    _.forEach(temp,function(item){
        RC+=table[item]
    })
    TC=RC/deck



}

function cards(times){
    let fourCards={banker:0,player:0,tie:0,hands:0} //0.3788
    let fiveCardsP={banker:0,player:0,tie:0,hands:0}//0.1856
    let fiveCardsB={banker:0,player:0,tie:0,hands:0}//0.1177
    let sixCards={banker:0,player:0,tie:0,hands:0}//0.3176

    for(let i=0;i<times;i++){
        let [r,burncard]=Baccarat(false)
        while(true){
            let hand=r.shift()
            if(hand){

                let playerHand=hand[0]
                let bankerHand=hand[1]
                let bankerPoint=points[hand[1].toString()]
                let playerPoint=points[hand[0].toString()]
                if(playerHand.length===2){
                    if(bankerHand.length===2){
                        fourCards.hands+=1
                        if(bankerPoint>playerPoint){
                            fourCards.banker+=1
                        }else if(bankerPoint===playerPoint){
                            fourCards.tie+=1
                        }else{
                            fourCards.player+=1
                        }
                    }else if(bankerHand.length===3){
                        fiveCardsB.hands+=1
                        if(bankerPoint>playerPoint){
                            fiveCardsB.banker+=1
                        }else if(bankerPoint===playerPoint){
                            fiveCardsB.tie+=1
                        }else{
                            fiveCardsB.player+=1
                        }
                    }
                }else{
                    if(bankerHand.length===2){
                        fiveCardsP.hands+=1
                        if(bankerPoint>playerPoint){
                            fiveCardsP.banker+=1
                        }else if(bankerPoint===playerPoint){
                            fiveCardsP.tie+=1
                        }else{
                            fiveCardsP.player+=1
                        }
                    }else if(bankerHand.length===3){
                        sixCards.hands+=1
                        if(bankerPoint>playerPoint){
                            sixCards.banker+=1
                        }else if(bankerPoint===playerPoint){
                            sixCards.tie+=1
                        }else{
                            sixCards.player+=1
                        }
                    }
                }
            }else{
                break
            }
        }

    }

    const total=fourCards.hands+fiveCardsP.hands+fiveCardsB.hands+sixCards.hands
    function getOdds(obj){
        const result={}
        result.bankerEV=(obj.banker*1.95+obj.tie)/obj.hands-1
        result.tieEV=(obj.tie*9)/obj.hands-1
        result.playerEV=(obj.player*2+obj.tie)/obj.hands-1
        result.frequency=obj.hands/total
        return result

    }
    console.log(getOdds(fourCards),getOdds(fiveCardsP),getOdds(fiveCardsB),getOdds(sixCards))

}




function GalaxyRegular(times,line,rolling=0.015){
    // console.log('run '+times+' times')
    let bankerWin=0
    let playerWin=0
    let tieWin=0
    let totalhands=0
    let bankerLuckyDraw=0
    let tieLuckyDraw=0
    const table={
        1:1,
        2:1,
        3:1,
        4:1,
        5:1,
        6:1,
        7:1,
        8:1,
        9:-12,
        10:1,
        11:1,
        12:1,
        13:1
    }
    const resultsTC={
            win:0,
            tie:0,
            lose:0
        }

    for(let i=0;i<times;i++){
        let [r,burnCard]=Baccarat(true)

        TC=RC=0
        RC+=table[burnCard]



        // console.log(r)
        let playerPoint,bankerPoint

        while(true){
            let hand=r.shift()
            if(hand){
                const currentTC=Math.round(TC)
                if(resultsTC[currentTC]===undefined){
                    resultsTC[currentTC]={
                        bankerWin:0,
                        playerWin:0,
                        tieWin:0,
                        bankerLuckyDraw:0,
                        tieLuckyDraw:0
                    }
                }

                totalhands+=1


                bankerPoint=points[hand[1].toString()]
                playerPoint=points[hand[0].toString()]
                if(bankerPoint>playerPoint){
                    if((hand[1].length===2)&&(bankerPoint===9)){
                        bankerLuckyDraw+=1
                        resultsTC[currentTC].bankerLuckyDraw+=1

                    }
                    bankerWin+=1
                    resultsTC[currentTC].bankerWin+=1

                }else if(bankerPoint===playerPoint){
                    tieWin+=1
                    resultsTC[currentTC].tieWin+=1


                    if((bankerPoint===9)&&(hand[1].length===2)){
                        resultsTC[currentTC].tieLuckyDraw+=1
                        tieLuckyDraw+=1
                    }

                }else{
                    playerWin+=1
                    resultsTC[currentTC].playerWin+=1
                }



            }else{
                break
            }
            // getCount(hand,table)
            // console.log(hand,RC,TC)

        }

    }

    {
        //handle resultsTC file
        _.forEach(resultsTC,function(obj){
            let totalInTC=obj.bankerWin+obj.playerWin+obj.tieWin
            obj.bankerOdd=(obj.bankerWin*1.95+obj.tieWin+obj.playerWin*rolling+obj.bankerLuckyDraw*0.25)/totalInTC-1
            obj.playerOdd=(obj.playerWin*2+obj.tieWin+obj.bankerWin*rolling)/totalInTC-1
            obj.tieOdd=(obj.tieWin*9+obj.tieLuckyDraw*5+obj.bankerWin*rolling+obj.playerWin*rolling)/totalInTC-1
            obj.frequecy=totalInTC*100/totalhands
        })
        console.log(resultsTC)

    }
    total=bankerWin+playerWin+tieWin
    // console.log(totalhands,bankerSuit,100*(bankerSuit/totalhands),playerSuit,100*(playerSuit/totalhands))
    console.log((playerWin*2+tieWin+bankerWin*rolling)/total-1,(bankerWin*1.95+tieWin+playerWin*rolling+bankerLuckyDraw*0.25)/total-1,(tieWin*9+tieLuckyDraw*5+bankerWin*rolling+playerWin*rolling)/total-1)


}


function BaccaratTC(times,rolling=0){
    // console.log('run '+times+' times')

    let totalHands=0



    let hand=undefined
    const resultsTC={}
    const table={
        1:-1,
        2:-1,
        3:-1,
        4:-2,
        5:1,
        6:2,
        7:1,
        8:1,
        9:0,
        10:0,
        11:0,
        12:0,
        13:0
    }
    for(let i=0;i<times;i++){
        let [r,burnCard]=Baccarat(true)
        TC=RC=0


        // console.log(r)
        let playerPoint,bankerPoint


        while(true){
            hand=r.shift()
            if(hand){
                const currentTC=Math.round(TC)
                if(resultsTC[currentTC]===undefined){
                    resultsTC[currentTC]={
                        banker:0,
                        player:0,
                        tie:0,

                    }
                }
                totalHands+=1


                bankerPoint=points[hand[1].toString()]
                playerPoint=points[hand[0].toString()]
                if(bankerPoint>playerPoint){

                    resultsTC[currentTC].banker+=1
                }else if(bankerPoint===playerPoint){
                    resultsTC[currentTC].tie+=1
                }else{
                    resultsTC[currentTC].player+=1
                }

                getCount(hand,table)
            }else{
                break
            }

        }

    }
    _.forEach(resultsTC,function(obj,key,results){
        let totalInTC=obj.banker+obj.player+obj.tie
        results[key].bankerOdd=(obj.banker*1.95+obj.tie+obj.player*rolling)/totalInTC-1
        results[key].playerOdd=(obj.player*2+obj.tie+obj.banker*rolling)/totalInTC-1
        results[key].tieOdd=(obj.tie*9+obj.banker*rolling+obj.player*rolling)/totalInTC-1
        results[key].frequecy=totalInTC*100/totalHands


    })
    console.log(resultsTC)
    // console.log(totalhands,bankerSuit,100*(bankerSuit/totalhands),playerSuit,100*(playerSuit/totalhands))
    // console.log((playerWin*2+tieWin+bankerWin*rolling)/total-1,(bankerWin*1.95+tieWin+playerWin*rolling)/total-1,betHands/totalHands)


}


console.time('Baccarat')
// console.log(GalaxyRegular(5000000))
BaccaratTC(10000,rolling=0.015)
console.timeEnd('Baccarat')

// Dragon7(50000,0)
// for(let i=0;i>=-9;i--){
//     console.log('TC =',i-1,' to ',i)
//     regular(10000000,i)
// }

// GoodLuckDragon7(1000000)




