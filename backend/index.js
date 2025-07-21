require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('Minestream API is running!'));
app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));