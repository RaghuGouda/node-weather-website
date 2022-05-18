const request = require('request');
const geocode = (address,callback)=>{

    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFnaHVtbiIsImEiOiJjbDMwY3c2czkwbTBiM2Rwc2J0NHNoZXJkIn0.mAPwSLlkhMW1xTeQxOpTWg&limit=1`
    request({url,json:true},(error,{body})=>{

        if(error){
            // console.log('unable to connect weatherstack service')
            callback('unable to connect weatherstack service',undefined)
        }else if (body.features.length===0) {
            // console.log('Your API request failed, please try wiht diffrent input or try again later')
            callback('Your API request failed, please try wiht diffrent input or try again later',undefined)
            
        } else {
            // console.log(`logitude: ${response.body.features[0].center[0]} latitude: ${response.body.features[0].center[1]}`)
           const coordinates={
            logitude: body.features[0].center[0],
            latitude: body.features[0].center[1]
            }
            console.log(coordinates)
            callback(undefined,coordinates)  
        }
})
}
module.exports=geocode