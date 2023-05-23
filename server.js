// Import required modules
const express = require('express');

const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors())
// API Routes
app.use('/restaurants', require('./routes/restaurantRoutes'));
app.use('users', require('./routes/userRoutes'));
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});


// Error handler middleware
app.use(require('./middlewares/errorHandler'));

// Load the SSL certificate and key
//const privateKey = fs.readFileSync('server.key', 'utf8');
//const certificate = fs.readFileSync('server.crt', 'utf8');
//const credentials = { key: privateKey, cert: certificate };

// Create the HTTPS server
//const httpsServer = https.createServer(credentials, app);

// Start the server
const port = process.env.PORT || 3000;
/*httpsServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});*/
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
} );