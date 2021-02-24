
const mongoose = require('mongoose');
require('dotenv').config({path:__dirname+'/../config/.env'});

const db=process.env.DB_URI;
const options={useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false}

  const connectToDb  = async()=>{
    try {
      await mongoose.connect(db,options);
      console.log("Database connected successfully");
    } catch (error) {
      handleDbError(error);
    }    
  }
  connectToDb();

function handleDbError(err){
    throw new Error(`DB connection not stablished: ${err} `)

}

