
import express from 'express';
import bodyParser from 'body-parser';
var cors = require('cors')
const corsOptions ={
    origin:'http://localhost:8080', 
    credentials:true,         
    optionSuccessStatus:200
}

const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./app/controllers/index')(app);

app.listen(3000);


