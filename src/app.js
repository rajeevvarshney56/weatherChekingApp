const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname,"../public");
const partialsPath = path.join(__dirname,"../templates/partials");
const templatesPath = path.join(__dirname,"../templates/views");

app.set('view engine','hbs');
app.set('views',templatesPath);

app.use(express.static(staticPath));
hbs.registerPartials(partialsPath);


app.get("/", (req,res) => { 
    res.render('index');
});

app.get("/about-us", (req,res) => {
    res.render('aboutus'); 
});

app.get("/weather-info", (req,res) => {
    res.render('weather');
});

app.get("/*", (req,res) => {
    res.render('404',{
        errorMsg:'Opps page not found !!'
    });
});

app.listen(port,() => {
    console.log(`listening port at ${port}`);
});