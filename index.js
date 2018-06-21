const config = require('config');
const logger = require('./middleware/logger');
const morgan = require('morgan');
const resourcesRouter = require('./routes/resources');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan('tiny'));


// Load routers
app.use('/api/resources', resourcesRouter);

if(app.get('env') != 'development') app.use(logger);

const port = process.env.PORT || 3000;

console.log(`Application name: ${config.get('appplicationName')}`);
app.listen(port, ()=> console.log(`Listening on port ${port}...`));