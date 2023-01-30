const express=require('express');
const app=express();
const dotenv=require('dotenv').config({path:"config/.env"})
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const path = require("path")

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "./client/build")));


// Routes middlewares
const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes= require("./routes/orderRoute");
const productReviewRoutes = require("./routes/productReviewRoute");
const cartItemRoutes = require("./routes/cartRoute");
const paymentRoutes = require("./routes/paymentRoute")

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Welcome User"
    })
})

app.use('/api/v1',userRoutes);
app.use('/api/v1',blogRoutes);
app.use("/api/v1",productRoutes);
app.use("/api/v1",orderRoutes);
app.use("/api/v1",productReviewRoutes);
app.use("/api/v1",cartItemRoutes);
app.use("/api/v1",paymentRoutes);

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});  

// Error Middleware
app.use(errorMiddleware);


module.exports = app;