const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const Blog = require('../models/Blogs');

/* GET home page. */
router.get('/all', async function(req, res) {

    //query blogs 
    try {
      const allBlogs = await Blog.find({});
      res.json({blogs: allBlogs });
    }catch(e){
      console.log(e);
    }
});

// // router.get("/get-one-example", async function (req, res, next) {
// //   const blogPosts = await db()
// //   .collection("posts") 
// //   .findOne({
// //       id: {
// //         $exists: true,
// //       },
// //   });

// //   console.log(blogPosts);

// //   res.json({
// //     success: true,
// //     post: blogPost,
// //   });
// // });


// // router.get("/get-one/:id", async function (req, res, next) {
// //   //checking if the parameter ID was passed in 
// //   if (!req.params.id) {
// //     res.json({
// //       success: false,
// //       message: "The blog id must be provided in the url parameters",
// //     });
// //     return;
// //   }

// //   console.log("first");
// //   //await blocks the execution until the promise resolves
// //   // aka. make sure line 47 finishes before we get on 
// //   // with the rest of our program 
// //   const blogPosts = await db().collection("sample_blogs").findOne({
// //     id: req.params.id,
// //   }); /*.catch({
// //     console.log("something went wrong");
// //   });*/
// //   console.log("second");
// //   //we don't want to a user to see the result before post is loaded.
// //   // so we use await, to block this from happening.
// //   res.json({
// //     success: true,
// //     posts: blogPosts,
// //   });
// //   //NOTE: FIND ONE is READ operation, the output holds the results of the operation.
// //   // so we add it in our res.json()
// //   console.log("third");
// // });

router.post("/create-one", async function (req, res, next) {
  try {
    //parse out fields from POST request
    const title  = req.body.title 
    const text = req.body.text 
    const author = req.body.author
    const categories = req.body.category
    const year =  req.body.year;

    //pass fields to new Blog model 
    //notice how it's way more organized and does the type checking for us
    const newBlog = new Blog({
        title,
        text,
        author,
        categories,
        year
    });

    //save our new entry to the database 
    const savedData =  await newBlog.save();
    
    //return the successful request to the user 
    res.json({
        success: true,
        blogs: savedData
    });

  } catch (e) {
    console.log(typeof e);
    console.log(e);
    res.json({
      error: e.toString(),
    });
  }
});

// // router.get("/get-multi", async function (req, res) {
// //   const sortField = req.query.sortField;
// //   const sortOrder = Number(req.query.sortOrder);
// //   const limit = Number(req.query.limit);
// //   const page = Number(req.query.page);

//   console.log(sortField, typeof sortField);
//   console.log(sortOrder, typeof sortOrder);
//   console.log(limit, typeof limit);
//   console.log(page, typeof page);

//   const skip = limit * (page - 1);
//   console.log(skip);

// 	const sortObject = {}
// 	sortObject[sortField] = sortOrder 
//   // {title: 1} -> sort ascending 
//   // {title: -1} -> sort descending

//   const blogs = await db()
//   .collection("sample_blogs")
//   .find({})
//   .sort(sortObject)
//   .limit(limit)
//   .skip(skip)
//   .toArray()

//   res.json({
// 		success: true,
// 		blogs
// 	});
// });

// router.delete('/delete-multi', async function (req, res) {
// 	try {
      
//       const idsToDelete = req.body

//       if (idsToDelete.length < 1){
//         throw Error("ids to delete empty!");
//       }
//       const deleteResult = await db().collection("sample_blogs").deleteMany({
//         id: {
//           $in: idsToDelete
//         }
//       })
  
//   } catch (e) {
//     res.send(e);
//   }
// 	res.json({
// 		success: true,
// 		deleteResult: deleteResult
// 	})
// })

module.exports = router;