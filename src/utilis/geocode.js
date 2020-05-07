
const  request = require('request')


const geocode=(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibW9rZXNoIiwiYSI6ImNrOWZ4aWc3cDBhcXAzbW1yc3I5eDBnbHIifQ.A5rDsozrk2bZOgDP2t4-KQ'
 
    request({url:url,json:true},(error,response)=>{
        if(error){
            //console.log('cant connect to the service');
            callback('unable to connect to location services!',undefined)
        }else if(response.body.features.length===0){
            callback('Unable to find ,try another search',undefined)
 
        }else{
                callback(undefined,{
                    latitude:response.body.features[0].center[1],
                    longitude:response.body.features[0].center[0]
                    ,location:response.body.features[0].place_name
                })
 
        }
    
           
     }) 
 
 }
 
 module.exports=geocode
 
      
