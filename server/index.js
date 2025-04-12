
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path')


const {poolPromise} = require('./configurations/db');
const fileRoutes = require('./routes/FileRoutes')





const app = express();


//Set up port
const port = process.env.PORT || 8080 ;

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


const startDBServer = async () => {
    try {

      await poolPromise(); // await DB connection 
      console.log("Database connected!");
     
    } catch (err) {
      console.error('Database connection failed:', err);
     
    }
  };


  app.get("/", (req, res) => { //qick get route to get message
    res.send("Welcome to the PDF Converter API!");
});


app.use(express.static(path.join(__dirname, 'client-build/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client-build/dist', 'index.html'));
}); 


app.listen(process.env.PORT || 8080, () => {
  console.log("✅ Server running...");
  startDBServer(); 
});












