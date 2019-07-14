var mongoose=require("mongoose")
var productList=new mongoose.Schema({
    category_name:{type:String},
    getUrl:{type:String},
    deltaGetUrl:{type:String}
})

module.exports=mongoose.model("ProductList",productList)