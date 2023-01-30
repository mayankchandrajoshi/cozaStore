const express = require("express");
const { createOrderId, getPaymentApiKey, paymentVerification, deleteMyRefund, deleteRefund } = require("../controllers/paymentController");
const { isAuthenticated, isAuthorized } = require("../middleware/auth")

const router = express.Router();

router.route("/payment/getkey").get(isAuthenticated,getPaymentApiKey);
router.route("/payment/create").post(isAuthenticated,createOrderId);
router.route("/payment/verify").post(isAuthenticated,paymentVerification);
router.route("/refund/:id").delete(isAuthenticated,deleteMyRefund);

router.route("/admin/refund/:id").delete(isAuthenticated,isAuthorized("admin"),deleteRefund);

module.exports = router;