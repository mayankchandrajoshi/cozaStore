const express = require("express");
const { createCartItem, getCartItems, deleteCartItem, updateCartItems, deleteAllCartItems } = require("../controllers/cartController");
const {isAuthenticated} = require("../middleware/auth")

const router = express.Router();

router.route("/cart").post(isAuthenticated,createCartItem).get(isAuthenticated,getCartItems).patch(isAuthenticated,updateCartItems).delete(isAuthenticated,deleteCartItem);

router.route("/cart/all").delete(isAuthenticated,deleteAllCartItems);

module.exports = router;