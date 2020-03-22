const request = require("request");

const forecast=(latitite,longitude,callback)=>
{
    const url1='https://api.darksky.net/forecast/c58cf5651852acf748c16d69894c2df0/'+latitite+','+longitude;
    
    request({url:url1,json:true},(error,response)=>{
        //console.log(response);
        if(error)
        {
            callback('unable to connect to the web service',undefined);
        }
        else if(response.body.error)
        {
           callback('unable to find the coordinates',undefined)
        }
        else
        {
            data={'summary':response.body.currently.summary,'temperature':response.body.currently.temperature}
            callback(undefined,data);
        }
    })
}

module.exports=forecast;