const mongoose=require('mongoose');

const connectDatabase=async ()=>{
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Cannot connect to database");
    }
}

module.exports=connectDatabase;