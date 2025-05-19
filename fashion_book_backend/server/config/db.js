const mongoose = require('mongoose');

// Update MongoDB connection with modern options to address deprecation warnings
const connectDB = async () => {
    try {
        // The connection string should be the same as your current one
        const conn = await mongoose.connect(
            'mongodb://ledoanngocn:ngocnam141203@ac-yq6ygkv-shard-00-02.8ynomfs.mongodb.net:27017,ac-yq6ygkv-shard-00-01.8ynomfs.mongodb.net:27017,ac-yq6ygkv-shard-00-00.8ynomfs.mongodb.net:27017/bookshop',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                ssl: true,
                retryWrites: true,
                authSource: 'admin',
                replicaSet: 'atlas-10f5nz-shard-0',
                writeConcern: { w: 'majority' },
            }
        );

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
