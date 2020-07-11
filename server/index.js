const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

//Middleware
app.use(express.json({extended:false}));//bodyParser
app.use(cors());

//Connect DB
connectDB();

//Define Routes
app.use('/',require('./routes'));


const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`Server started on port : ${PORT}`));
