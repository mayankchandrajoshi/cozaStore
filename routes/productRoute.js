const express = require("express");
const { createProduct, getAllProducts,getSingleProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAuthenticated, isAuthorized } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);

router.route("/admin/products/create").post(isAuthenticated,isAuthorized("admin"),createProduct);
router.route("/admin/product/:id").patch(isAuthenticated,isAuthorized("admin"),updateProduct).delete(isAuthenticated,isAuthorized("admin"),deleteProduct);

module.exports = router;