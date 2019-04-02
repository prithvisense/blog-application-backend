const express = require('express')
const mongoose = require('mongoose')
const shortId = require('shortid')

const BlogModel = mongoose.model('Blog')

//to get all blogs 
var getAllBlogs = (req, res) => {
    BlogModel.find()
        .select('-_v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err);
                res.send(err)

            } else if (result == undefined || result == null || result == '') {
                console.log('No Blogs Found');
                res.send('No Blogs Found')

            } else {
                res.send(result)

            }
        })
}

//get blogs by id
let viewBlogById = (req, res) => {

    BlogModel.findOne({ 'blogId' : req.params.blogId }, (err, result) => {
        
        if(err){
            console.log(err);
            res.send(err)
            
        }else if (result == undefined || result == null || result == ''){
            console.log('No Blog Found');
            res.send('No Blogs Found')
            
        }else{
            res.send(result)
        }

    })

}

//create blog
let createBlog = (req, res) => {
    let today = Date.now()
    let blogId = shortId.generate()


let newBlog = new BlogModel({
    blogId: blogId,
    title: req.body.title,
    description: req.body.description,
    bodyHtml: req.body.blogBody,
    isPublished: true,
    category: req.body.category,
    author: req.body.fullname,
    created: today,
    lastModified: today
})
let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ?req.body.tags.split(',') : []
newBlog.tags = tags

newBlog.save((err, result) => {
    if(err){
        console.log(err);
        res.send(err)
        
    }else{
        res.send(result)
    }
})

}

//edit blogs
let editBlog = (req, res) => {
    
    let options = req.body
    console.log(options);
    BlogModel.update({ 'blogId': req.params.blogId }, options, {multi: true}).exec((err, result) => {
        if(err){
            console.log(err);
            res.send(err)
            
        }else if(result == undefined || result == null || result == ''){
            console.log('No Blogs Found');
            res.send('No Blogs Found')
            
        }else{
            res.send(result)
            console.log(result);
            
        }
    })
    
}

//delete blog

let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId' : req.params.blogId }, (err, result) => {
        if(err){
            console.log(err);
            res.send(err)
            
        } else if(result == undefined || result == null || result == '') {
            console.log('No Blogs Found');
            res.send('No Blogs Found')
            
        } else{
            console.log(result);
            res.send(result)
            
        }
    })
}

//increase blog view
let increaseBlogView = (req, res) => {
    BlogModel.findOne({'blogId' : req.params.blogId}, (err, result) => {
            if(err){
                console.log(err);
            } else if(result == undefined || result == null || result == ''){
                console.log('No Blogs Found');
                res.send('No Blogs Found')
            }else{
                result.views +=1
                result.save(function(err, result) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Blog updated successfully');
                        res.send('Blog updated successfully')
                        
                    }
                })
            }
    }
    )

}











module.exports = {
    getAllBlogs: getAllBlogs,
    viewBlogById: viewBlogById,
    // viewbyAuthor: viewbyAuthor,
    // viewByCategory: viewByCategory,
    deleteBlog: deleteBlog,
    editBlog: editBlog,
    createBlog: createBlog,
    increaseBlogView: increaseBlogView
}