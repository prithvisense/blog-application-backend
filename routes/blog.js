const express = require('express')
const blogController = require('../controllers/blogControllers')
const appConfig = require('../config/appConfig')

let setRouter = (app) => {
    let baseUrl = appConfig.apiversion + '/blogs' 
    // app.get('/test/route/:firstName/:lastName', blogController.testRoute)
    // app.get('/test/query', blogController.testQuery)
    // app.post('/test/body', blogController.testBody)

    //get all blogs
    app.get(baseUrl + '/all', blogController.getAllBlogs)
    //get blog by id
    app.get(baseUrl + '/view/:blogId', blogController.viewBlogById)
    // app.get(baseUrl, + '/view/by/author/:author', blogController.viewByAuthor)
    // app.get(baseUrl + '/view/by/category/:category', blogController.viewByCategory)
    // app.post(baseUrl + '/:blogId/delete', blogController.deleteBlog)
    app.put(baseUrl + ':blogId/edit', blogController.editBlog)
    //create blog
    app.post(baseUrl + '/create', blogController.createBlog)
    // app.get(baseUrl + '/:blogId/count/view', blogController.increaseBlogView)



}//end setRouter function


module.exports = {
    setRouter: setRouter
}