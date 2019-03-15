const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const appConfig = require('./config/appConfig')
const blog = require('./routes/blog')

const app = express()
const routesPath = './routes'

fs.readdirSync(routesPath).forEach(function(file){
    if(~file.indexOf('.js')){
        let route = require(routesPath + '/' + file);
        route.setRouter(app)
    }
})//end bootstrap route


//adding database code here



app.listen(appConfig.port, () => {
    console.log('Example app listening on port 3000')
    //creating mongodb connection
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true })
});

//handling mongoose connection error
mongoose.connection.on('error', function(err){
    console.log('database connection error');
    console.log(err);
    
})//end mongoose connection error

//handling mongoose success event
mongoose.connection.on('open', function(err){
    if(err){
        console.log('database error');
        console.log(err);
    }else{
        console.log('database connection open success');
        
    }
})//end mongoose open connection handler







//handling mongoose success event