const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./src/routes/routes');
// require('./src/db');    

require('dotenv').config({path:__dirname+'/src/config/.env'});
const port  = process.env.PORT;


// register middleware here
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// register app routes here

app.get('/',(req,res,next)=>{
    res.status(200).json({
        name:"jone parker"
    })
});
app.use('/api',api);


// listing the server
app.listen(port, ()=> console.log("Server is listing on port ", port));

