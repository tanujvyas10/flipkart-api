var mongoose=require("mongoose")
var productrelated=new mongoose.Schema({

    p_id:{type:String},
    p_title:{type:String},
    p_category:{type:String},  
    p_img_small:{type:String},
    p_img_medium:{type:String},
    p_img_large:{type:String},
    p_retail_price:{type:String},
    p_retail_currency:{type:String},
    p_productUrl:{type:String},
    p_productBrand:{type:String},
    p_instock:{type:Number},
    p_cod:{type:Number} 
})

module.exports=mongoose.model("Productrelated",productrelated)