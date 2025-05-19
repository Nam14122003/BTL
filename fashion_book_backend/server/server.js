const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Replace collection.ensureIndex with createIndex
// Example:
// collection.createIndex({...})

// Replace collection.count with:
// For exact counts: collection.countDocuments({...})
// For estimated counts: collection.estimatedDocumentCount({...})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});