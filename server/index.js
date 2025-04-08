
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const {poolPromise} = require('./configurations/db');
const fileRoutes = require('./routes/FileRoutes')





const app = express();


//Set up port
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use("/files",fileRoutes)


//setting up the adress for easy use
const host = process.env.HOST || "localhost";
const protocol = process.env.PROTOCOL || "http";

const theAdress = `${protocol}://${host}:${port}`;

//DB set up then start server:


const startServer = async () => {
    try {
      await poolPromise(); // await DB connection 
      app.listen(port, () => console.log(`✅ Server running on port ${port} adress: ${theAdress}`));
    } catch (err) {
      console.error('Database connection failed:', err);
      process.exit(1); // stop app if DB fails
    }
  };


  app.get("/", (req, res) => { //qick get route to get message
    res.send("Welcome to the PDF Converter API!");
});


  startServer(); //server starts









