const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express=require('express')
const hbs = require('hbs')

const app = express()

//Sets up file and directory paths for express config.
const filePath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

//Sets up the view engine and handlebars
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Serves up static directory
app.use(express.static(filePath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sandheep'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Creator',
        name:'Sandheep'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Section',
        msg:'This application displays the real time weather stats.',
        name:'Sandheep'
    })
})

app.get('/weather',(req, res)=>{
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){return res.send({error})}

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){return res.send({error})}

            res.send({
                address:req.query.address,
                location,
                forecast:forecastData
            })
        })
    })
    
    // res.send({
    //     address:req.query.address,
    //     location:data.location,
    //     forecast:forecastData
    // })

})

app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('generic404',{
        title:'404 error page',
        error:'Help article not found.Try searching for what you want in the above pages.',
        name:'Sandheep'
    })
})

app.get('*',(req,res)=>{
    res.render('generic404',{
        title:'404 error page',
        error:'Given page not found.Try searching for what you want in the above pages.',
        name:'Sandheep'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})