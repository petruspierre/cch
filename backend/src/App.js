const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const corsOptions = {
  exposedHeaders: 'X-Total-Count',
};

//app.use(bodyParser.json())
app.use(cors(corsOptions));
app.use(express.json())
app.use(routes)

app.listen(3333)