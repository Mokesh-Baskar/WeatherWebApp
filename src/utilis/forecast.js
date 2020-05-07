
//const url ='http://api.weatherstack.com/current?access_key=a6d75a65f4c704c47903dccd242af12f&query=37.8267,-122.4233&units=f'


/*request({url: url,json:true},(error,response)=>{
//const data=JSON.parse(response.body)
const temp=response.body.current.temperature
const precip=response.body.current.precip
console.log('it is currently '+temp+'degree out.The chance of rain is '+precip)
//console.log(data)

})*/





const request=require('request')
const forecast=(lat,long,callback)=>{
const url='http://api.weatherstack.com/current?access_key=a6d75a65f4c704c47903dccd242af12f&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)+'&units=f'
 request({url:url,json:true},(error,response)=>{
       if(error){
           callback('unable to connect to service',undefined)
       }else if(error===601){
           callback('no search result found try diffrent one',undefined)
       }else{
            callback(undefined,{
                temperature:response.body.current.temperature
                ,humidity:response.body.current.humidity

            })
       }
 })
}


module.exports=forecast