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
                odds[key]={}

                odds[key].player=(obj.player*2+obj.tie)/hands -1
                odds[key].tie=(obj.tie*9)/hands-1
            })

            odds['0']={
                player:(odds['10'].player+odds['11'].player+odds['12'].player+odds['13'].player)/4,
                tie:(odds['10'].tie+odds['11'].tie+odds['12'].tie+odds['13'].tie)/4
            }

            delete odds['10']
            delete odds['11']
            delete odds['12']
            delete odds['13']
        }else{
            _.forEach(results,function(obj,key){
                let hands=obj.banker+obj.tie+obj.player
                odds[key]={}
                odds[key].banker=(obj.banker*1.95+obj.tie)/hands -1
                odds[key].tie=(obj.tie*9)/hands-1
            })
            odds['0']={
                banker:(odds['10'].banker+odds['11'].banker+odds['12'].banker+odds['13'].banker)/4,
                tie:(odds['10'].tie+odds['11'].tie+odds['12'].tie+odds['13'].tie)/4
            }
            delete odds['10']
            delete odds['11']
            delete odds['12']
            delete odds['13']
        }

        return odds

    }

    function mergeOdd(p,b){
        const odds=JSON.parse(JSON.stringify(p))
        _.forEach(odds,function(odd,index){
            odds[index].banker=b[index].banker
            odds[index].tie=(odds[index].tie+b[index].tie)/2
        })
        return odds

    }
    const position13P=getOdd(card13P,true)
    const position13B=getOdd(card13P,false)
    const position13=mergeOdd(position13P,position13B)

    const position24P=getOdd(card24B,true)
    const position24B=getOdd(card24B,false)
    const position24=mergeOdd(position24P,position24B)

    const wb=new xl.Workbook()
    {
        const ws13=wb.addWorksheet('Position 13')
        let columns=['card','Player EV','Banker EV','Tie EV']
        ws13.cell(1,1)
            .string('Position 1,3')


        for(let i=0;i<columns.length;i++){
            ws13.cell(2,i+1)//cell column can not be 0
                .string(columns[i])
        }
        let row=3
        _.forEach(position13,function(result,index){
            ws13.cell(row,1).string(index)
            ws13.cell(row,2).string(result.player.toFixed(7))
            ws13.cell(row,3).string(result.banker.toFixed(7))
            ws13.cell(row,4).string(result.tie.toFixed(7))
            row++
        })
    }

    {
        const ws24=wb.addWorksheet('Position 24')
        let columns=['card','Player EV','Banker EV','Tie EV']
        ws24.cell(1,1)
            .string('Position 2,4')


        for(let i=0;i<columns.length;i++){
            ws24.cell(2,i+1)//cell column can not be 0
                .string(columns[i])
        }
        let row=3
        _.forEach(position24,function(result,index){
            ws24.cell(row,1).string(index)
            ws24.cell(row,2).string(result.player.toFixed(7))
            ws24.cell(row,3).string(result.banker.toFixed(7))
            ws24.cell(row,4).string(result.tie.toFixed(7))
            row++
        })
    }






    // console.log(position13P,position13B)




    const position5P={}
    _.forEach(card5P,function(v,k){

        let total=card5P[k].banker+card5P[k].tie+card5P[k].player+card5B[k].banker+card5B[k].tie+card5B[k].player+
            card6P[k].banker+card6P[k].tie+card6P[k].player

        position5P[k]={}

        position5P[k].player=(((card5P[k].player*2+card5P[k].tie)+
            (card5B[k].player*2+card5B[k].tie)+
            (card6P[k].player*2+card6P[k].tie))/total-1)*(1-0.3788) //if 4 cards player's EV is 0

        position5P[k].tie=(((card5P[k].tie*9)+
            (card5B[k].tie*9)+
            (card6P[k].tie*9))/total-1)*(1-0.3788)+(0.3788)*(-0.1443)

    })
    position5P['0']={}
    position5P['0'].player=(position5P['10'].player+position5P['11'].player+position5P['12'].player+position5P['13'].player)/4
    position5P['0'].tie=(position5P['10'].tie+position5P['11'].tie+position5P['12'].tie+position5P['13'].tie)/4
    delete position5P['10']
    delete position5P['11']
    delete position5P['12']
    delete position5P['13']



    const position5B={}
    _.forEach(card5P,function(v,k){

        let total=card5P[k].banker+card5P[k].tie+card5P[k].player+card5B[k].banker+card5B[k].tie+card5B[k].player+
            card6P[k].banker+card6P[k].tie+card6P[k].player

        position5B[k]={}
        position5B[k].banker=(((card5P[k].banker*1.95+card5P[k].tie)+
            (card5B[k].banker*1.95+card5B[k].tie)+
            (card6P[k].banker*1.95+card6P[k].tie))/total-1)*(1-0.3788)+0.3788*(-0.022) //if 4 cards banker's EV is -0.02254

        position5B[k].tie=(((card5P[k].tie*9)+
            (card5B[k].tie*9)+
            (card6P[k].tie*9))/total-1)*(1-0.3788)+(0.3788)*(-0.1443)
    })

    position5B['0']={}
    position5B['0'].banker=(position5B['10'].banker+position5B['11'].banker+position5B['12'].banker+position5B['13'].banker)/4
    position5B['0'].tie=(position5B['10'].tie+position5B['11'].tie+position5B['12'].tie+position5B['13'].tie)/4
    delete position5B['10']
    delete position5B['11']
    delete position5B['12']
    delete position5B['13']

    const position5=mergeOdd(position5P,position5B)

    {
        const ws5=wb.addWorksheet('Position 5')
        let columns=['card','Player EV','Banker EV','Tie EV']
        ws5.cell(1,1)
            .string('Position 5')


        for(let i=0;i<columns.length;i++){
            ws5.cell(2,i+1)//cell column can not be 0
                .string(columns[i])
        }
        let row=3
        _.forEach(position5,function(result,index){
            ws5.cell(row,1).string(index)
            ws5.cell(row,2).string(result.player.toFixed(7))
            ws5.cell(row,3).string(result.banker.toFixed(7))
            ws5.cell(row,4).string(result.tie.toFixed(7))
            row++
        })
    }



    const position6P={}
    _.forEach(card6B,function(v,k){

        let total=card6B[k].banker+card6B[k].tie+card6B[k].player
        position6P[k]={}
        position6P[k].player=((card6B[k].player*2+card6B[k].tie)/total-1)*(0.3178) +(0*0.3786)+(-0.5399*0.1857)+(0.5388*0.1177)
        position6P[k].tie=(card6B[k].tie*9/total-1)*(0.3178)+(-0.1443*0.3786)+(-0.1443*0.1857)+(-0.3093*0.1177)

    })
    position6P['0']={}
    position6P['0'].player=(position6P['10'].player+position6P['11'].player+position6P['12'].player+position6P['13'].player)/4
    position6P['0'].tie=(position6P['10'].tie+position6P['11'].tie+position6P['12'].tie+position6P['13'].tie)/4
    delete position6P['10']
    delete position6P['11']
    delete position6P['12']
    delete position6P['13']



    const position6B={}
    _.forEach(card6B,function(v,k){

        let total=card6B[k].banker+card6B[k].tie+card6B[k].player
        position6B[k]={}
        position6B[k].banker=((card6B[k].banker*1.95+card6B[k].tie) /total-1)*(0.3178)+(-0.02254*0.3786)+(0.5037*0.1857)+(-0.5484*0.1177)
        position6B[k].tie=(card6B[k].tie*9/total-1)*(0.3178)+(-0.1443*0.3786)+(-0.1443*0.1857)+(-0.3093*0.1177)

    })
    position6B['0']={}
    position6B['0'].banker=(position6B['10'].banker+position6B['11'].banker+position6B['12'].banker+position6B['13'].banker)/4
    position6B['0'].tie=(position6B['10'].tie+position6B['11'].tie+position6B['12'].tie+position6B['13'].tie)/4
    delete position6B['10']
    delete position6B['11']
    delete position6B['12']
    delete position6B['13']
    const position6=mergeOdd(position6P,position6B)
    {
        const ws6=wb.addWorksheet('Position 6')
        let columns=['card','Player EV','Banker EV','Tie EV']
        ws6.cell(1,1)
            .string('Position 6')


        for(let i=0;i<columns.length;i++){
            ws6.cell(2,i+1)//cell column can not be 0
                .string(columns[i])
        }
        let row=3
        _.forEach(position6,function(result,index){
            ws6.cell(row,1).string(index)
            ws6.cell(row,2).string(result.player.toFixed(7))
            ws6.cell(row,3).string(result.banker.toFixed(7))
            ws6.cell(row,4).string(result.tie.toFixed(7))
            row++
        })
    }

    // console.log(position6B)

    wb.write('knownCard.xlsx')
}

console.time('Baccarat')
// console.log(GalaxyRegular(5000000))
knownCard(2500000,rolling=0.015)
console.timeEnd('Baccarat')