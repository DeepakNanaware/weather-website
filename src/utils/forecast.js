const request = require('request')
const { response } = require('express')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=32415fc2de3704fb403849dc47095b6d&query=' + lat + ',' + lon + '&units=m'

    request({ url, json: true }, (error, {body}) => {
        if (error){
            callback("Unable to connect to weather Service!",undefined)
        }
        else if (body.error){
            callback('Unable to find location.',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + ". Its " + body.current.temperature + " degrees out. But feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast