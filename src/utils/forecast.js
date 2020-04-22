const request=require('request')



const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/17917cae7d2058c06b679ecb794f0293/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
    request({url,json:true},(error,{body})=>{
         if (error) {
              callback('Unable to access forecast services.',undefined)
         } 
         else if(body.error){
              callback('Invalid coordinates!',undefined)
         }
    
         else {
              callback(undefined,body.daily.data[0].summary+'It is currently '+body.currently.temperature+' degrees out.'+'There is '+body.currently.precipProbability+' probability of chance of rain.')

         }
       
    }) 
}

module.exports=forecast