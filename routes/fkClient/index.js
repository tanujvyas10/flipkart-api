
var details=require("../details")

var client = require('flipkart-api-affiliate-client');



var fkClient = new client({
    trackingId:details.trackingId,
    token:details.token,
  },"json");
  

  module.exports=fkClient