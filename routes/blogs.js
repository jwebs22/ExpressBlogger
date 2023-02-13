const express = require('express');
const router = express.Router();

const { validateBlogData } = require("../validation/blogs");

//instantiate mongoDB
const { db } = require('../mongo');

// GET ALL blogs in MongoDB --DONE
router.get('/all', async function(req, res, next) {
  const blogs = await db()
    .collection('sample_blogs')
    .find({})

    .toArray(function(err, result)
    {
      if (err) {
      res.status(400).send("error fetching blogs")  
      } else {
        res.json(result);
      }
    });

  res.json({
    success:true,
    blogs: blogs
  });
});

// GET ONE (random) blog in MongoDB. --DONE
router.get('/get-one', async function(req, res, next) {

  const blogs = await db()
    .collection('sample_blogs')
    // gets first one:
    // .find({})
    // .limit(1)
    //gets random:
    .aggregate([{ $sample: { size: 1 } }])
    .toArray(function(err, result)
    {
      if (err) {
      res.status(400).send("error fetching blogs")  
      } else {
        res.json(result);
      }
    });

  res.json({
    success:true,
    blogs: blogs
  });
});

//to get one random doc from filtered subset. From: https://stackoverflow.com/questions/2824157/how-can-i-get-a-random-record-from-mongodb
// Get one random document matching {a: 10} from the mycoll collection.
// db.mycoll.aggregate([
//     { $match: { a: 10 } },
//     { $sample: { size: 1 } }
// ])


//Get Single Blog by ID using MongoDB --DONE
router.get("/get-one/:blogTitleToGet", async function(req, res, next)
{
  const blogToFind = req.params.blogTitleToGet
  console.log(blogToFind);
  const foundBlog = await db()
  .collection('sample_blogs')
  .findOne({title: blogToFind})
  // .toArray(function(err, result)
  // {
  //   if (err){
  //     res.status(400).send("error finding that blog title")
  //   } else{
  //     res.json(result)
  //   }
  // })

  res.json({
      success: true,
      foundBlog: foundBlog
  })
})

//Delete Single Blog Title using MongoDB --DONE
router.delete("/single/:blogTitleToDelete", async function (req, res)
{
  const blogToDelete = req.params.blogTitleToDelete
  console.log(blogToDelete);

  const foundBlogToDelete = await db()
  .collection('sample_blogs')
  .deleteOne({title: blogToDelete})
  // .toArray(function(err, result)
  // {
  //   if (err){
  //     res.status(400).send("error finding that blog title")
  //   } else{
  //     res.json(result)
  //   }
  // })

  res.json({
      success: true
  })
})

//Post new blog using MongoDB --DONE, but validation check doesn't work
router.post("/create-one", async function(req, res, next)
{
  try {
    // anticipate fields of our post request /create-one
    // parse out request data to local constiables
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;
    const category = req.body.category;

    //create blogData object fields
    const newBlog = await db()
    .collection("sample_blogs")
    .insertOne({
      title,
      text,
      author,
      category,
      createdAt: new Date(),
      lastModified: new Date()
    });

    // //pass blog data object to our validate function
    // const blogDataCheck = validateBlogData(newBlog);

    // if (blogDataCheck.isValid === false) {
		// 	throw Error(blogDataCheck.message)
    //   // res.json({
    //   //   success: false,
    //   //   message: blogCheck.message,
    //   // });
    //   // return;
    // }

    res.json({
      success: true,
    });
  } catch (e) {
    //console.log the error and respond with an error object
    console.log(e);
    res.json({
			success: false,
			error: String(e)
		});
  }
})

//Stretch Goals
//Get Multiple Blogs MongoDB --DONE
router.get("/get-multi", async function(req, res, next)
{
  const multiblogs = await db()
  .collection("sample_blogs")
  .find({
    author: "Ronald Barrows"
  }).sort({createdAt: -1}) //sort in descending order

  const results = await multiblogs.toArray();

  res.json({
    success: true,
    message: results
  })
})

//Delete Multiple Blogs Mongo --DONE
router.delete("/delete-multi", async function(req, res, next)
{
  const blogsToDelete = await db()
  .collection("sample_blogs")
  .deleteMany({ "author": "Ronald Barrows"})

  res.json({
    success: true,
    message: `${blogsToDelete.deletedCount} blog(s) was/ were removed.`
  })
})

//PUT update to a blog by ID, MongoDB --DONE
router.put("/single/:blogToUpdate", async function(req, res, next)
{
    const titleToFind = req.params.blogToUpdate

    const updatedBlog = {}

    if (req.body.title !== undefined){
      updatedBlog.title = req.body.title
    } else {
      updatedBlog.title = originalBlog.title
    }
  
    if (req.body.text !== undefined){
      updatedBlog.text = req.body.text
    } else {
      updatedBlog.text = originalBlog.text
    }
  
    if (req.body.author !== undefined){
      updatedBlog.author = req.body.author
    } else {
      updatedBlog.author = originalBlog.author
    }
  
    if (req.body.category !== undefined){
      updatedBlog.category = req.body.category
    } else {
      updatedBlog.category = originalBlog.category
    }
  
    updatedBlog.createdAt = new Date()
    updatedBlog.lastModified = new Date()

    const updateBlog = await db()
    .collection("sample_blogs")
    .updateOne({ title: titleToFind }, { $set: updatedBlog})

    res.json({
        success: true,
        message: `${updateBlog.matchedCount} blog(s) matched the query. ${updateBlog.modifiedCount} blog(s) was/ were updated.`
      })
})

module.exports = router;