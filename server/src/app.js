const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!require('fs').existsSync(uploadsDir)){
    require('fs').mkdirSync(uploadsDir);
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Handle 404 errors (routes that don't exist)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error stack trace

    // Send error response, including stack trace in development
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
});

module.exports = app;
