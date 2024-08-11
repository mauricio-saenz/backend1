const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const routesAPI = require('./routes/api');
const routesWEB = require('./routes/web');

app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


app.use('/api', routesAPI);
app.use('/', routesWEB);

module.exports = app;
