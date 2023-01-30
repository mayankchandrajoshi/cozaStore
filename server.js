const app = require('./app');
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv").config({ path: "config/.env" });

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log("Error: " + err.message);
    console.log("Shutting down the server due to Uncaught Exception ");
    process.exit(1);
});

connectDatabase().then(()=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const server=app.listen(process.env.PORT,()=>{
        console.log("Server listening on port " + process.env.PORT);
    })
    
    // Unhandled Promise Rejection
    process.on("unhandledRejection", (err) => {
        console.log("Error : " + err.message);
        console.log("Shutting down the server due to unhandled Promise Rejection");
    
        server.close(() => {
        process.exit(1);
        });
    });
})