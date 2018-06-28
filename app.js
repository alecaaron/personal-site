const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compress = require('compression');
const app = express();
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(helmet());
      app.use(compress());

const Port = process.env.PORT || 8080;

//set up templating engine
app.set('views', './views');
app.set('view engine', 'ejs');

// protect file system
app.use("/public", express.static('./assets/'));
app.use("/", express.static('./stylesheets/'));
app.use("/", express.static("./node_modules/"))

// call routes
const Home = require('./routes/__home__');
app.use('/', Home);

const Resume = require('./routes/__resume__');
app.use('/resume', Resume);

const sendMail = require('./routes/__sendMail__');
app.use('/sendMail', sendMail);

// const Projects = require('./routes/__projects__');
// app.use('/projects', Projects);


app.listen(Port, ()=>{
  console.log(`Example is listening on port ${Port}`);
});
