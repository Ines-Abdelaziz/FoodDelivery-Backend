// Import required modules
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use('/restaurants', require('./routes/restaurantRoutes'));



// Error handler middleware
app.use(require('./middlewares/errorHandler'));


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
