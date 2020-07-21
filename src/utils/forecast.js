const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=47c3d1409ea0ce0dea5dc3c71258bbcd&query='+latitude + ',' + longitude

    request({url,json:true},(error,{body} = {}) => {

        if(error) {
            console.log(error)
            callback("Unable to connect to location services",undefined)
        } else if (body.error){
            callback("Unable to find location", undefined)
        } else {
    
        const temperature = body.current.temperature
        const feelslike = body.current.feelslike
        const weather_description = body.current.weather_descriptions[0]

            callback(undefined,{
                Forecast: weather_description,
                Temperature:  temperature,
                FeelsLike: feelslike
            })
        }
    
    })
}

module.exports = forecast