const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Sample test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
