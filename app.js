const express = require('express');
const path = require ('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport  = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database, {useNewUrlParser:true , useUnifiedTopology:true}); 

// On Connection
mongoose.connection.on('connected' , ()=>{
    console.log('Connected to DataBase' + config.database);
});

// On Error
mongoose.connection.on('error' , (err)=>{
    console.log('Database Error' + err);
});

const app = express();

const users = require('./models/user');

// Port Number
const port = 4000 ;

// CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname , 'public')));

//bodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users' , users);

//INDEX Route
app.get('/' , (req ,res) => {
    res.send('invalid Endpoint');
})

// Start Server  
app.listen(port , () => {
    console.log('Server started on port ' + port);
})
