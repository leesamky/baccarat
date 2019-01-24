const Baccarat=require('./BaccaratFaceCard')
const _=require('lodash')

const xl=require('excel4node')
const fs=require('fs')
const points=JSON.parse(fs.readFileSync('faceCard.txt',{encoding:'utf-8'}))
function knownCard(times){

    let totalHands=0
    const card13P={
        '1':{
            player:0,
            tie:0,
            banker:0
        },
        '2':{
            player:0,
            tie:0,
            banker:0
        },
        '3':{
            player:0,
            tie:0,
            banker:0
        },
        '4':{
            player:0,
            tie:0,
            banker:0
        },
        '5':{
            player:0,
            tie:0,
            banker:0
        },
        '6':{
            player:0,
            tie:0,
            banker:0
        },
        '7':{
            player:0,
            tie:0,
            banker:0
        },
        '8':{
            player:0,
            tie:0,
            banker:0
        },
        '9':{
            player:0,
            tie:0,
            banker:0
        },
        '10':{
            player:0,
            tie:0,
            banker:0
        },
        '11':{
            player:0,
            tie:0,
            banker:0
        },
        '12':{
            player:0,
            tie:0,
            banker:0
        },
        '13':{
            player:0,
            tie:0,
            banker:0
        }

    }
    const card24B=JSON.parse(JSON.stringify(card13P))
    const card5B=JSON.parse(JSON.stringify(card13P)), card5P=JSON.parse(JSON.stringify(card13P)),card6P=JSON.parse(JSON.stringify(card13P)),card6B=JSON.parse(JSON.stringify(card13P))

    for (let i=0;i<times;i++){
        let [r,burnCard]=Baccarat(false)
        let playerPoint,bankerPoint

        while(true){
            totalHands+=1
            let hand=r.shift()
            if(hand){
                let playerHand=hand[0]
                let bankerHand=hand[1]
                bankerPoint=points[hand[1].toString()]
                playerPoint=points[hand[0].toString()]
                if(bankerPoint>playerPoint){
                    card13P[playerHand[0]].banker+=1
                    card13P[playerHand[1]].banker+=1

                    card24B[bankerHand[0]].banker+=1
                    card24B[bankerHand[1]].banker+=1


                    if((playerHand.length===3)&&(bankerHand.length===2)){
                        card5P[playerHand[2]].banker+=1

                    }else if((playerHand.length===2)&&(bankerHand.length===3)){

                        card5B[bankerHand[2]].banker+=1

                    }else if((playerHand.length===3)&&(bankerHand.length===3)){
                        card6P[playerHand[2]].banker+=1

                        card6B[bankerHand[2]].banker+=1
                    }
                    // if(playerHand.length===3){
                    //     card5P[playerHand[2]].lose+=1
                    //     card5B[playerHand[2]].win+=1
                    //     if(bankerHand.length===3){
                    //         card6B[bankerHand[2]].win+=1
                    //         card6P[bankerHand[2]].lose+=1
                    //     }
                    // }else if((playerHand.length===2)&&(bankerHand.length===3)){
                    //     card5B[bankerHand[2]].win+=1
                    //     card5P[bankerHand[2]].lose+=1
                    // }
                }else if(bankerPoint===playerPoint){
                    card13P[playerHand[0]].tie+=1
                    card13P[playerHand[1]].tie+=1

                    card24B[bankerHand[0]].tie+=1
                    card24B[bankerHand[1]].tie+=1

                    if((playerHand.length===3)&&(bankerHand.length===2)){
                        card5P[playerHand[2]].tie+=1

                    }else if((playerHand.length===2)&&(bankerHand.length===3)){

                        card5B[bankerHand[2]].tie+=1

                    }else if((playerHand.length===3)&&(bankerHand.length===3)){
                        card6P[playerHand[2]].tie+=1

                        card6B[bankerHand[2]].tie+=1
                    }
                }else{//player win
                    card13P[playerHand[0]].player+=1
                    card13P[playerHand[1]].player+=1

                    card24B[bankerHand[0]].player+=1
                    card24B[bankerHand[1]].player+=1

                    if((playerHand.length===3)&&(bankerHand.length===2)){
                        card5P[playerHand[2]].player+=1

                    }else if((playerHand.length===2)&&(bankerHand.length===3)){

                        card5B[bankerHand[2]].player+=1

                    }else if((playerHand.length===3)&&(bankerHand.length===3)){
                        card6P[playerHand[2]].player+=1

                        card6B[bankerHand[2]].player+=1
                    }
                }

            }else{
                break
            }
        }
    }

    function getOdd(results,player){
        let odds={}
        if(player){
            _.forEach(results,function(obj,key){
                let hands=obj.player+obj.tie+obj.banker

                odds[key]=(obj.player*2+obj.tie)/hands -1
            })

            odds['0']=(odds['10']+odds['11']+odds['12']+odds['13'])/4
            delete odds['10']
            delete odds['11']
            delete odds['12']
            delete odds['13']
        }else{
            _.forEach(results,function(obj,key){
                let hands=obj.banker+obj.tie+obj.player
                odds[key]=(obj.banker*1.95+obj.tie)/hands -1
            })
            odds['0']=(odds['10']+odds['11']+odds['12']+odds['13'])/4
            delete odds['10']
            delete odds['11']
            delete odds['12']
            delete odds['13']
        }

        return odds

    }
    const position13P=getOdd(card13P,true)
    const position13B=getOdd(card13P,false)
    console.log(position13P,position13B)




    const position5P={}
    _.forEach(card5P,function(v,k){

        let total=card5P[k].banker+card5P[k].tie+card5P[k].player+card5B[k].banker+card5B[k].tie+card5B[k].player+
            card6P[k].banker+card6P[k].tie+card6P[k].player

        position5P[k]=(((card5P[k].player*2+card5P[k].tie)+
            (card5B[k].player*2+card5B[k].tie)+
            (card6P[k].player*2+card6P[k].tie))/total-1)*(1-0.3788) //if 4 cards player's EV is 0


    })

    position5P['0']=(position5P['10']+position5P['11']+position5P['12']+position5P['13'])/4
    delete position5P['10']
    delete position5P['11']
    delete position5P['12']
    delete position5P['13']

    const position5B={}
    _.forEach(card5P,function(v,k){

        let total=card5P[k].banker+card5P[k].tie+card5P[k].player+card5B[k].banker+card5B[k].tie+card5B[k].player+
            card6P[k].banker+card6P[k].tie+card6P[k].player

        position5B[k]=(((card5P[k].banker*1.95+card5P[k].tie)+
            (card5B[k].banker*1.95+card5B[k].tie)+
            (card6P[k].banker*1.95+card6P[k].tie))/total-1)*(1-0.3788)+0.3788*(-0.022) //if 4 cards player's EV is 0


    })

    position5B['0']=(position5B['10']+position5B['11']+position5B['12']+position5B['13'])/4
    delete position5B['10']
    delete position5B['11']
    delete position5B['12']
    delete position5B['13']


    const position6P={}
    _.forEach(card6B,function(v,k){

        let total=card6B[k].banker+card6B[k].tie+card6B[k].player

        position6P[k]=((card6B[k].player*2+card6B[k].tie)/total-1)*(0.3178) +(0*0.3786)+(-0.5399*0.1857)+(0.5388*0.1177)


    })

    position6P['0']=(position6P['10']+position6P['11']+position6P['12']+position6P['13'])/4
    delete position6P['10']
    delete position6P['11']
    delete position6P['12']
    delete position6P['13']

    const position6B={}
    _.forEach(card6B,function(v,k){

        let total=card6B[k].banker+card6B[k].tie+card6B[k].player

        position6B[k]=((card6B[k].banker*1.95+card6B[k].tie) /total-1)*(0.3178)+(-0.02254*0.3786)+(0.5037*0.1857)+(-0.5484*0.1177) //if 4 cards player's EV is 0


    })

    position6B['0']=(position6B['10']+position6B['11']+position6B['12']+position6B['13'])/4
    delete position6B['10']
    delete position6B['11']
    delete position6B['12']
    delete position6B['13']

    console.log(position6B)
}

console.time('Baccarat')
// console.log(GalaxyRegular(5000000))
knownCard(10000,rolling=0.015)
console.timeEnd('Baccarat')