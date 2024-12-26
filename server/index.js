const express = require('express')
const bodyParser = require('body-parser')
const routes = require('../routes/index');
const mongoconnect = require('../utils/mongo');
const app = express()
const port = 3000;


// app.use();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/v1/api', routes);

app.listen(port, () => {
  mongoconnect.connect();
  console.log(`Example app listening on port ${port}`)
})