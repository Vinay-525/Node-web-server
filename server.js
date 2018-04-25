const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs')


app.use((req,res,next) => {
  var log = `${new Date().toString()} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n' ,(err) => {
    if(err){
        console.log('Unable to log to server.log');
    }
  });
  next();
})

app.use((req,res,next) => {
    res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getFullYear',() => {
    return new Date().getFullYear()
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle : 'Home Page',
    welcomeMessage : 'Welcome to the Home Page'
  })
})

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle : 'About Page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage : 'Error Handler'
  });
});

app.listen(3000,() => {
  console.log('Server is running!!!');
})
