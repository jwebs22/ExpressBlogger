

const Blog = require('../models/Blogs');

//Get all blogs
async function getAllBlogs(req, res) {

    //query blogs 
    try {
      const allBlogs = await Blog.find({});
      res.json({blogs: allBlogs });
    }catch(e){
      console.log(e);
    }
};

//Create One Blog
async function createOneBlog(req, res, next) {
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
  };


  //Get one blog
  async function getOneBlog(req, res, next) {

    try {
      const oneBlog = await Blog.find({}).limit(1);
      res.json({blogs: oneBlog });
    }catch(e){
      console.log(e);
    }
};


  // Get one by ID --DONE
  async function getOneById(req, res, next) {

    try {
      const oneBlogId = await Blog.find({id: req.params.id});
      res.json({blogs: oneBlogId });
    }catch(e){
      console.log(e);
    }
};

//Dominic's version, not working for me. Crashes program after it returns the blog.
/*
async function getOneBlog(req, res, next) {


    let oneBlogPost;

    try {
        oneBlogPost = await Blog.findOne({id: req.params.id});
    } catch (error) {
        console.log(error);
    }
    res.json({
        sucess: true,
        oneBlog: oneBlogPost
    })
}
*/

//Delete one
//Working, but should error check. Getting true even if no id match
async function deleteOneBlog(req,res){
    const entryId = req.params.id;

    try {
        await Blog.deleteOne({id: entryId});
    } catch (err) {
        console.log(err);
        throw err;  
    }

    res.json({
        success: true,
        message: `blog entry id ${entryId} deleted`
    })
}

// //Michael's Delete One: //still needs to set in postman and blogs
// async function deleteOneBlog(req, res, next) {
//     try {
//       const oneBlog = await Blog.findOneAndRemove({"id": req.params.id});
//       res.json({message: "Removed", 
//         blog: oneBlog});
//     }
//     catch (error) {
//       res.status(500).send(error);
//     }
//   };

  

module.exports = {
    getAllBlogs,
    createOneBlog,
    getOneBlog,
    getOneById,
    deleteOneBlog
};