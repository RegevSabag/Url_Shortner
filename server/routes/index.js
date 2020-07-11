const express = require('express');
const router = express.Router();
const randomstring = require("randomstring")
var validUrl = require('valid-url');
const Url = require('../models/url.js');
const path = require('path');
const BASE_URL = "localhost:4000/";

// @route   GET api/
// @desc    get all shorten URLs
// @access  Public
router.get('/', async (req,res) => {
  Url.find({}, function(err, urlObj){
    let objs = [];
    objs = urlObj.filter(value => {
      let hour = Math.floor(((Date.now() - value.createAt) / 1000) / 3600);
      if(hour < 24){
        return value;
      }
      else {
        Url.findOneAndDelete({baseURL: value.baseURL}, (err,res) => {
          if (err){ 
          console.log(err) 
          } 
         else{ 
          console.log("Deleted: ", res); 
          }
        });
      }
    })
    res.send(objs);
  })
});

// @route   POST api/shortener
// @desc    create short url
// @access  Public
router.post('/shortener',  function(req, res){ 
  if (!validUrl.isUri(req.body.url)){
    return res.send({
      type: 'error',
      message: 'The URL is not valid.'
    });
  }
  var ramdomString = randomstring.generate(5);
  var url = new Url({
    baseURL: req.body.url,
    key: ramdomString,
    shotenURL: BASE_URL + ramdomString
  });
  url.save(function (err, url) {
    if (err) {
      res.send({
        type: 'error',
        message: 'Shorten url already exist'
      });
    } else {
      res.send({
        type: 'success',
        message: 'You are created your url shorten!',
        data: url
      });
    }
  });
});

// @route   GET api/:key
// @desc    redirect to base url
// @access  Public
router.get('/:key', async (req,res) => {
  Url.findOne({'key': req.params.key}, function(err, urlObj){
    if(err) {
      return res.sendFile(path.join(__dirname, '../public', 'page_not_found.html'));
    }
    if(urlObj){
      let hour = Math.floor(((Date.now() - urlObj.createAt) / 1000) / 3600);
      if(hour >= 24){
        return res.sendFile(path.join(__dirname, '../public', 'page_not_found.html'));
      }
      res.redirect(urlObj.baseURL);
    } else {
      res.sendFile(path.join(__dirname, '../public', 'page_not_found.html'));
    }
  });
});






module.exports = router;