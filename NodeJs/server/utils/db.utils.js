
const mongoose = require('mongoose');
const DB_URI = "mongodb+srv://harshit:poddar@mycluster.ag9s9.mongodb.net/";
    const connectDB = async () => {
        try {
            await mongoose.connect(DB_URI,{})
            console.log('MongoDB connected ...');
        } catch (error) {
            console.log(error);
        }
    }
    module.exports = connectDB;