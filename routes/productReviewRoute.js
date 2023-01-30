const express = require("express");
const { createProductReview , getProductReviews,getProductReview, updateProductReview, deleteProductReview } = require("../controllers/productReviewController");
const {isAuthenticated,isAuthorized} = require("../middleware/auth")

const router = express.Router();

router.route("/product/create/review").post(isAuthenticated,createProductReview );
router.route('/product/reviews/:id').get(getProductReviews);
router.route("/product/review/:id").get(isAuthenticated,getProductReview)

module.exports=router;