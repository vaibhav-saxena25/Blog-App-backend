const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MONGODB connected ${mongoose.connection.host}`.bgMagenta.white);
    }catch(error){
        console.log(`MONGOS connect Error`.bgRed.white);
    }
}

module.exports = connectDB