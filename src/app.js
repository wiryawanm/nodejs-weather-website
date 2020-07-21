const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// Define paths
const public_path = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


const app = express()
const port = process.env.PORT || 3000

//Setup handlebars 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory for css/js
app.use(express.static(public_path))
app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Iwan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is my help page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Iwan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must procide an adress'
        })
    }

    geocode(req.query.address, (error, {Latitude,Longitude,Location} = {}) => {
        if(error){
            return res.send({
                error: 'Error by geocode ' + error
            })        
        }
    
        forecast(Latitude, Longitude,(error,data_forecast) => {
            if(error){
                return res.send({
                    error: 'Error by forecast' + error
                })              
            }
            return res.send({
                location: Location,
                forecast: data_forecast
            })      
        }) 
    
    })

    // console.log(req.query)
    // res.send({
    //     forecast: 'Sunny',
    //     location: req.query.address

    // })
})




app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404',
        message: 'Help page not found'
    })
})


app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on ' + port)
})