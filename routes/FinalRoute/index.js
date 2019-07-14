var express = require('express');
var router = express.Router();
 var fkClient=require("../fkClient")
 var Productrelated=require("../../database/productrelated")

 router.get("/:title",function(req,res,next){
     //res.send("REsult")
     // console.log("reached")
  //   Productrelated.collection.drop()

Productrelated.find({},function(err,data){
    if(err) throw err
    else
    {
    //   // console.log(data)
    //    fkClient.doIdSearch(data.p_id).then(function(value){
    //         //   res.send(value.body); //object with status, error and body
    //     console.log(value.body) 
       // res.render("result",{data:value.body})
   
     data.forEach((el)=>{
         console.log("pdi--",el.p_category)
     })
 //   res.send(value.body)

res.render("result",{result:data,title:"Products related to "+req.params.title})
        
    }
})
  
        
    //res.send(data[0])  
     })
 
 

 module.exports=router