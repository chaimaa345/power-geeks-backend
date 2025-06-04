const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');


app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Sample test route

app.get('/', (req, res) => {

  res.send('API is running...');

});


// Start server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   

