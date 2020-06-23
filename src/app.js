const path =require('path')
const express =require('express')
const hbs=require('hbs')
const geocode = require('./util/geocode')
const forecast =require('./util/forecast')

const app=express()
const port =process.env.PORT || 3000

const publicdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../template/views')
const partialpath=path.join(__dirname,'../template/partial')


app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

app.use(express.static(publicdir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhishek Shaw'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhishek Shaw'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Abhishek Shaw'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
           error:'provides address please'
        })
    }

     geocode(req.query.address,(error,{lat,long,location}={})=>{
        if(error){
            return res.send({error})
         }
         forecast(lat,long, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
          })
     })
     
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'must provide'
//         })
//     }
 
//     res.send({
//     products:[]
// })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhishek Shaw',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhishek Shaw',
        errorMessage: 'Page not found.'
    })
})
app.listen(port,()=>{
    console.log('start')
})