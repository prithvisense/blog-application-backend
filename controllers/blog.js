const express = require('express')



let helloWrldFunction = (req, res) => res.send('Hello World')
let example = (req, res) => res.send('Print Example')

module.exports = {
    helloWrldFunction: helloWrldFunction,
    example: example
}