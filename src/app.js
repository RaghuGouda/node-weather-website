const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express();

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views loaction
app.set('view engine', 'hbs');
app.set('views',viewPath)
hbs.registerPartials(partialPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Raghu'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Raghu',
        number:232321323
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Raghu',
        age:27
    })
})

app.get('/weather',(req,res)=>{
    console.log(req.query)
    if(!req.query.address){
       return res.send({
            error:'please provide the correct address'
        })
    }
    geocode(req.query.address,(err,{latitude,logitude}={})=>{
        if(err){
           return res.send({
                err
            })
        }
       forecast(latitude,logitude,(err,result)=>{
        if(err){
            return res.send({
                 err
             })
         }
         res.send({
            forecast:result, 
            address:req.query.address
        })

       })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMsg:'Help Artical Not Found',
        name:'Raghu',
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMsg:'Page Not Found',
        name:'Raghu',
    })
})

app.listen(3000,()=>{
    console.log('listen port no 3000')
})