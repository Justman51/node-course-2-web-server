/*

HEROKU WEB SITE

https://lit-citadel-70722.herokuapp.com/

*/

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//const public = require('./public');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
  });
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); // It knows when to interpret it


app.use((req, res, next) => {
    //console.log(req);
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFileSync('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
     next();
});

// app.use((req, res, next) => {
//    res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));
// console.log("this is the :", __dirname);
// console.log(public);



/* req: Is input(request) from the User 
res: The data base response to the user request */

app.get('/', (req, res) => { 
    //res.send('<h1>Hello Express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcome: 'You are welcome to Narture'
    })
});

app.get('/about', (req, res) => { 
    res.render('about.hbs', {
        pageTitle: 'About Page'
        
    }) ;
});

app.get('/bad', (req, res) => {
    res.send({
        message: 'Unable to return message'
    })
});

app.get('/project', (req, res) => { 
    res.render('project.hbs', {
        pageTitle: 'Project Page'
        
    }) ;
});

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`);
});