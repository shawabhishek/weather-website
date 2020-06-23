const request = require('request')

const geocode=(address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic2hhd2FiaGlzaGVrIiwiYSI6ImNrYnE2b2pnYjJoYXAzNG5jOXdxZ2I4cmgifQ.4xKJPjul8lbJs2sjWXa25Q&limit=1'

    request ({url:url,json:true},(error,response)=>{
        if(error){
            callback('Network Problem',undefined)
        }else if(response.body.features.length==0) {
            callback('Not found',undefined)
        }
        else{
            callback(undefined,{
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }  
    })
}

module.exports=geocode