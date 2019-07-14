var express = require('express');
var router = express.Router();
var i=0;
var fkClient=require("../fkClient")
var ProductList=require("../../database/productfeedlist")
var ProductFeed=require("../../database/productfeed")
router.get("/:product",function(req,res,next){

  //  ProductFeed.collection.drop()

  var getCategoryUrl= new Promise(function(resolve,reject){
ProductList.find({},function(err,data){
    data.forEach(function(min_data){
        console.log("req.paras",req.params.product)
        console.log("min_data",min_data.category_name)
        if(req.params.product==min_data.category_name)
        {
            //console.log("matvched")
            resolve(min_data.getUrl)
        }
           
           else
           {
             
           console.log("not matched",i++)
           }
        })
})
  })

//   fkClient.getProductsFeed("https://affiliate-api.flipkart.net/affiliate/1.0/feeds/yuganshch/category/jek-p31.json?expiresAt=1562450528770&sig=dca890e0e3fec036a41cfa22a25456df").then(function(data){
//     var json_data=JSON.parse(data.body);
// res.send(json_data)
//   //  json_data.products.forEach(function(product){
//     //console.log(product)
//    // })
// })



  getCategoryUrl.then(function(getUrl){
      return new Promise(function(resolve,reject){
          var insertProductsFromUrl=function(url){
              if(url==null)
                 console.log(url);

fkClient.getProductsFeed(url).then(function(data){
    //res.send(json_data)
    var json_data=JSON.parse(data.body);
  
json_data.products.forEach(function(product){
  //  console.log(product)

ProductFeed.create({ 
    p_id:product.productBaseInfoV1.productId,
    p_title:product.productBaseInfoV1.title ,
    p_category:req.params.product ,  
    p_img_small:product.productBaseInfoV1.imageUrls['200x200'] ,
    p_img_medium:product.productBaseInfoV1.imageUrls['400x400'] ,
    p_img_large :product.productBaseInfoV1.imageUrls['800x800'],
    p_retail_price:product.productBaseInfoV1.maximumRetailPrice.amount ,
    p_retail_currency:product.productBaseInfoV1.maximumRetailPrice.currency ,
    p_productUrl:product.productBaseInfoV1.productUrl ,
    p_productBrand:product.productBaseInfoV1.productBrand ,
    p_instock:product.productBaseInfoV1.inStock ,
    p_cod:product.productBaseInfoV1.codAvailable},function(err,data){
        if(err)
           console.log(err)
          else
          console.log("data saved in thr listt") 
    })   
})
if(json_data.nextUrl){
    insertProductsFromUrl(json_data.nextUrl)
}
else
    resolve("inserted Products into Database")

}).catch(function(error){
    console.log("ROOORORO",error)
})

          }
          insertProductsFromUrl(getUrl);
      }) 
  })
  .then(function(tempData){
    console.log(tempData)
    res.redirect("/specific_product/"+req.params.product)

})
    
  //res.send(req.params.product);  
})

module.exports=router