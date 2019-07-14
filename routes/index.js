var express = require('express');
var router = express.Router();
var fkClient=require("./fkClient")
var ProductList=require("../database/productfeedlist")
var Productfeedlist=require("../database/productfeed")
var Productrelated=require("../database/productrelated");


/* GET home page. */
router.get('/', function(req, res, next) {

  ProductList.collection.drop()
  Productfeedlist.collection.drop()

  Productrelated.collection.drop()

  res.render('index', { title: 'Welcome to the flipkart-api-affiliate-clients demonstation' });
});

router.post("/",function(req,res,next){


  console.log(req.body)
  fkClient.getProductsFeedListing().then(function(value){
    //res.send(value.body); //object with status, error and body
    var json_data=JSON.parse(value.body)
  //  var listing = Object.keys(json_data.apiGroups.affiliate.apiListings);
  var listing = Object.keys(json_data.apiGroups.affiliate.apiListings);

  listing.forEach(function(listing){
    var getUrl= json_data.apiGroups.affiliate.apiListings[listing].availableVariants["v1.1.0"].get;
  console.log(getUrl)
  
     var deltaGetUrl=json_data.apiGroups.affiliate.apiListings[listing].availableVariants["v1.1.0"].deltaGet;
    
     ProductList.create({category_name:listing,getUrl:getUrl,deltaGetUrl:deltaGetUrl},function(err,data){
       if(err)
          res.send(err)
         //console.log(data)

       
     })


  })
  //res.send("data is saved")
  res.redirect("/product_find/"+req.body.Product); 
  
  })  
})




module.exports = router;
