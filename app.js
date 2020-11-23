const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const bodyparser = require("body-parser");

const mongoose = require('mongoose');
// Linking Database or Creating 
mongoose.connect('mongodb://localhost/ContactDance', {useNewUrlParser: true, useUnifiedTopology: true});
// Testing connection is succesfull or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Define mongoose schema
// const DanceContactSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: String,
//     add: String,
//     desc: String
// });
const contactSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Phone: String,
    Address: String,
    Description: String,
  });


//Create model of the DanceContactSchema
// const Contact = mongoose.model('Contact', DanceContactSchema);
const Contact = mongoose.model('Contact', contactSchema);



app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) 

app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req,res)=>{
    var userData = new Contact(req.body);
    userData.save().then(()=>{
        res.send("Data is Saved in DataBase");
    }).catch(()=>{
        res.status(404).send("Data is not Saved");
    });
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port http://localhost:${port}`);
});