const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controllers/blogControllers');
//router object
const router = express.Router();
//routes
//get || all-blogs
router.get('/all-blogs',getAllBlogsController);

//post || create blog
router.post('/create-blog',createBlogController);

//put || update blog
router.put('/update-blog/:id',updateBlogController);

//get || single Blog details
router.get('/get-blog/:id',getBlogByIdController);

//delete || delete routes
router.delete('/delete-blog/:id',deleteBlogController);

// get || user blog 
router.get('/user-blog/:id',userBlogController);
module.exports = router;
