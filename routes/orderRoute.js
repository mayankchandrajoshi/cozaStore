const express = require("express");
const { createOrder ,getAllOrders,myOrders,getOrderDetails,updateOrder,deleteOrder, getOrderDetailsAdmin, deleteMyOrder} = require('../controllers/orderController')
const {isAuthenticated, isAuthorized} =  require("../middleware/auth")

const router = express.Router();

router.route("/orders/create").post(isAuthenticated,createOrder);
router.route("/orders/me").get(isAuthenticated,myOrders);
router.route("/order/:id").get(isAuthenticated,getOrderDetails).delete(isAuthenticated,deleteMyOrder);

router.route('/admin/orders/all').get(isAuthenticated,isAuthorized("admin"),getAllOrders);
router.route('/admin/order/:id').get(isAuthenticated,isAuthorized("admin"),getOrderDetailsAdmin).patch(isAuthenticated,isAuthorized("admin"),updateOrder)

module.exports = router;