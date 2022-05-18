const request = require('request');

const forecast = (latitude,logitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=c74c50fd4c8147450e061be226cd3e1c&query=${latitude},${logitude}&units=f`
    console.log('url',url)

    request({url,json:true},(error,{body})=>{
    
        if(error){
            console.log('unable to connect weatherstack service')
            callback('unable to connect weatherstack service',undefined)
        }else if (body.error) {
            console.log(body.error.info)
            callback(body.error.info,undefined)
            
        } else {
            console.log(`${body.current.weather_descriptions[0]} : it is currently ${body.current.temperature} degress out, it feels like ${body.current.feelslike} degress out`)
            callback(undefined,`${body.current.weather_descriptions[0]} : it is currently ${body.current.temperature} degress out, it feels like ${body.current.feelslike} degress out,  with humidity of ${body.current.humidity} degrees`)
    
        }
    })
}
module.exports=forecast