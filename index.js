const express = require('express')
const fs = require('fs')
const appConfig = require('./config/appConfig')
const blog = require('./routes/blog')

const app = express()
const routesPath = './routes'

fs.readdirSync(routesPath).forEach(function(file){
    if(~file.indexOf('.js')){
        let route = require(routesPath + '/' + file);
        route.setRouter(app)
    }
})

app.listen(appConfig.port, () => console.log('Example app listening on port 3000'));