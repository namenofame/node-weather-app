const request = require("request");

const geocode=(address,callback)=>
{
    const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFkaHVyMTgiLCJhIjoiY2s4MXNnOXM1MGowNjN0bXN6c2theGEwdCJ9.KDYbl4TOY0Lj92N45p1jOQ&limit=1'
    request({url:url2,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect to the web service',undefined);
        }
        else if(response.body.features.length==0)
        {
           callback('unable to find the location',undefined)
        }
        else
        {
            
            const coordinates=response.body.features[0].center;
            //console.log(coordinates);
            data={'Location':response.body.features[0].place_name,'Latitude':coordinates[1],'Longitude':coordinates[0]};
            //console.log(data);
            callback(undefined,data);
        }
    })
}





module.exports=geocode;