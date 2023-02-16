const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();


const blogsController = require('../controllers/blogsController');

// GET All Blog Posts
router.get("/all", blogsController.getAllBlogs);

// POST new Blog Post
router.post("/create-one", blogsController.createOneBlog);

// GET one Blog Post
router.get("/get-one-example", blogsController.getOneBlog);

// GET one by ID
router.get("/get-one-by-id/:id", blogsController.getOneById);

// DELETE one by ID
router.delete("/delete-one/:id", blogsController.deleteOneBlog);


module.exports = router;