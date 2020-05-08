const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
const port = process.env.PORT || 3000
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mokesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mokesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Mokesh'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
             error:'you must send a search address'})
     }
     //console.log(req.query.address);
     const address=req.query.address.toString()
    geocode(address,(error,data)=>{
        if (error){
            console.log(error)
        }
        else{
            const lat=data.latitude.toString()
            const long=data.longitude.toString()
            const location=data.location.toString()
             forecast(lat,long,(error,{temperature,summary,precipitation,humidity,cloudcover,feelslike,uv,visibility}={})=>{
                 if(error){
                     console.log(error)
                 }else{
                    res.send({
                        location,temperature,summary,precipitation,humidity,cloudcover,feelslike,uv,visibility
   
                    })
                 }
                     
             })
        }
        
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: req.query.address
    // })
})

app.get('/products',(req,res)=>{
          if(!req.query.search){
             return res.send({
                  error:'you must send a search item'})
          }


          console.log(req.query)
          res.send({
              products:[]
          })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mokesh',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mokesh',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})