var express = require('express');
var router = express.Router();
 var fkClient=require("../fkClient")
//var ProductList=require("../../database/productfeedlist")
 var ProductFeed=require("../../database/productfeed")
 var ProductRelated=require("../../database/productrelated")

router.get("/:category",function(req,res,next){
//  ProductRelated.collection.drop()

   // res.send(req.params.category)
  // fkClient.doKeywordSearch(req.params.category,20).then(function(value){
    //res.send(value.body); //object with status, error and body
//});

res.render("enter_prod",{category:req.params.category})

})




module.exports=router;