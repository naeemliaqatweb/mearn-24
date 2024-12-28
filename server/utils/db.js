const mongoose = require('mongoose'); // Fixed spelling
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB has been connected!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit with a failure code
    }
};

module.exports = connectDB;
