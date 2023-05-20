// Import required modules
const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use('/restaurants', require('./routes/restaurantRoutes'));



// Error handler middleware
app.use(require('./middlewares/errorHandler'));

// Load the SSL certificate and key
const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create the HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start the server
const port = process.env.PORT || 3000;
httpsServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});