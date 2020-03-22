const express=require('express')
const path=require('path');
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express();

publicPath=path.join(__dirname,'../public')
viewsPath=path.join(__dirname,'../templates/views')
partialsPath=path.join(__dirname,'../templates/partials')

app.use(express.static(publicPath));

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        'title':'Home Page',
        'name':'Madhur'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        'title':'About Page',
        'name':'Madhur'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help!',
        message:'Want help from us!',
        name:'Madhur'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error',
        name:'Madhur',
        error:'Help article not found.'
    })
})
app.get('/weather',(req,res)=>{
    let data={
        location:'Los Angeles',
        forecast:'Temperature is 50 degree'
    }
    if(!req.query.address)
    {

        return res.send({
            error:'Address must be provided!'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error)
        {
            return res.send({
                error:error
                
            })
        }
        //console.log(data.Latitude);
        //console.log(data.Longitude);
        forecast(data.Latitude,data.Longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({
                    
                        error:error
                })
            }
            res.send({
                loacation:data.Location,
                forecast:forecastData
            })
          })
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error',
        name:'Madhur',
        error:'Page not found.'
    })
})
app.listen(3000,()=>{
    console.log('Server is up!');
})