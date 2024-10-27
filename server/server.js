const Paths = require("./src/utils/paths")

// Set the environment
const dotenv = require('dotenv');
dotenv.config({path: Paths.env.env});
switch (process.env.NODE_ENV){
    case "development":
        console.log("Loading development environment...");
        dotenv.config({path:Paths.env.dev});
        break;
    case "test":
        console.log("Loading test environment...")
        dotenv.config({path:Paths.env.test});
        break;
    case "production":
        console.log("Loading production environment...")
        dotenv.config({path:Paths.env.prod});
        break;
    default:
        console.log('No environment defined. Please set the `NODE_ENV` variable in the `.env` file');
        process.exit(1);
}

// Create the App from our app.js file
const app = require(Paths.app.app);

const PORT = process.env.PORT || 3000;
let portString;
switch (process.env.NODE_ENV){
    case "production":
        portString = "";
        break;
    default:
        portString = `:${PORT}`
        break;
}

// Handle unexpected errors that weren't caught elsewhere
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);  // Exit with failure code
});

// Handle promises that reject without being caught
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Base URL: ${process.env.PROTOCOL}://${process.env.DOMAIN}${portString}`)
});


// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      console.log('Process terminated.');
      process.exit(0);  // Exit with success code
    });
});
