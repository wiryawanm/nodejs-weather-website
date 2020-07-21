const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZTEtbWVoYW5kYSIsImEiOiJja2NnaDFwMHYwczJvMnJubjdla3ZocGJpIn0.detXIfhovgvGqDwepMlqyw&limit=1'

    request({url,json:true},(error, {body} = {}) => {

        if(error) {
            callback("Unable to connect to location services",undefined)
        } else if (!body.features.length){
            callback("Unable to find location", undefined)
        } else {
            const center = body.features[0].center
            callback(undefined,{
                Longitude: center[0],
                Latitude:  center[1],
                Location: body.features[0].place_name
            })
        }
    
    })
}



module.exports = geocode