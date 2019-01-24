const mongoose=require('mongoose')
const Schema=mongoose.Schema

mongoose.Promise=global.Promise

mongoose.connect('mongodb://localhost:27017/baccarat',{ useNewUrlParser: true })//port, options
mongoose.connection
    .once('open',()=>{
        console.log('Good to go!')

    })
    .on('error',(error)=>{
        console.warn('Warning',error)
    })



const ShoeSchema=new Schema({
    shoe:{type:Array,required:true}

})

const Shoe=mongoose.model('shoe',ShoeSchema)

module.exports=Shoe