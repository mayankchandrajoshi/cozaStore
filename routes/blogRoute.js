const express = require("express");
const { createBlog, getAllBlogs, updateBlog, deleteBlog, getSingleBlog, getBlogComments, createBlogComment, getBlogComment } = require("../controllers/blogController");
const { isAuthenticated, isAuthorized } = require("../middleware/auth");

const router = express.Router();

router.route("/blogs").get(getAllBlogs);
router.route("/blog/:id").get(getSingleBlog)
router.route("/blogs/reviews/:id").get(getBlogComments);
router.route('/blogs/review/:id').get(isAuthenticated,getBlogComment).post(isAuthenticated,createBlogComment);

router.route('/blogs/create').post(isAuthenticated,isAuthorized("admin"),createBlog);
router.route("/admin/blog/:id").patch(isAuthenticated,isAuthorized("admin"),updateBlog).delete(isAuthenticated,isAuthorized("admin"),deleteBlog);

module.exports = router;