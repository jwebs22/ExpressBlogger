var express = require('express');
var router = express.Router();

//import models
const Blog = require('../models/Blogs');

/* GET home page. */
router.get('/', async function(req, res) {

  //query blogs 
  try {
    const allBlogs = await Blog.find({});
    //view: this is what the user sees
    res.json({blogs: allBlogs });
  }catch(e){
    console.log(e);
  }
});


module.exports = router;