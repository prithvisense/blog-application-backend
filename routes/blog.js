const express = require('express')
const blogController = require('../controllers/blog')

let setRouter = (app) => {

    
    app.get('/hello', blogController.helloWrldFunction)
    app.get('/example', blogController.example)


}


module.exports = {
    setRouter: setRouter
}