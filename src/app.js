const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define Path for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index',{
        title : "Weather App",
        name : "Deepak"
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title : "About Me",
        name : "Deepak"
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title : "Help",
        name : "Deepak",
        helptext : "Here is some Help text"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : "Please Provide address"
        })
    }

    geocode(req.query.address,(error,{lat, lon, placename} = {}) => {
        if(error){
            return res.send({ error })
        }
        
        forecast(lat,lon,(error,forecastdata) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location : placename,
                address : req.query.address
            })
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title : "My 404 Page",
        name : "Deepak",
        errortext : "Help article Not Found"
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title : "My 404 Page",
        name : "Deepak",
        errortext : "Page Not Found"
    })
})

app.listen(3000, () => {
    console.log('server started')
})