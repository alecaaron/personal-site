const express = require('express');
const app = express();
const helmet = require('helmet');
  app.use(helmet());
const compress = require('compression');
  app.use(compress());
const Port = 1234; // process.env.PORT || 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

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
