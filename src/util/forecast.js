const request = require('request')

const forecast =(lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/3990cd51ecc55694d46b994abefe4b2e/'+ lat +',' + long+'?units=si'
    
    request({url:url ,json:true},(error,response)=>{
        if(error){
            callback('Network Problem',undefined)
        }
        else if(response.body.error){
             callback('unable to find location',undefined)
        }
        else{
             callback(undefined,response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })


}
module.exports=forecast