
var express = require('express');
var router = express.Router();
 var fkClient=require("../fkClient")
//var ProductList=require("../../database/productfeedlist")
 var ProductFeed=require("../../database/productfeed")
 var ProductRelated=require("../../database/productrelated")




router.post("/search_prod",function(req,res,next){
    const p_title=[];
    const p_title_related=[];
    const related_data=[];
        ProductFeed.find({},function(err,data){
            data.forEach((el)=>{
                p_title.push(el.p_title)
            })
    
        //    res.send(p_title)
    p_title.forEach(function(el){
        if(el.includes(req.body.spec_product)){
          p_title_related.push(el)
        }
    }) 
    
    
    
    ProductFeed.find({},function(err,data){
        data.forEach((el)=>{
    
        
        for(var i=0;i<p_title_related.length;i++)
        {
            if(el.p_title==p_title_related[i]){
                ProductRelated.create({
                    p_id:el.p_id,
                    p_title:el.p_title,
                    p_category:el.p_category,  
                    p_img_small:el.p_img_small,
                    p_img_medium:el.p_img_medium,
                    p_img_large:el.p_img_large,
                    p_retail_price:el.p_retail_price,
                    p_retail_currency:el.p_retail_currency,
                    p_productUrl:el.p_productUrl,
                    p_productBrand:el.p_productBrand,
                    p_instock:el.p_instock,
                    p_cod: el.p_cod
                },function(err,data){
                    if(err) throw err;
    
                    //console.log(data)
                })
            }
                 
        }
    
    
    })
    
    console.log("related data saved now")
    })
    })
    
    
    res.redirect("/final_result/"+req.body.spec_product)
    })
    
    module.exports=router;