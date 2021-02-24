const { UniqueConstraintError } = require("../helpers/errors");

module.exports.interactWithDB= (database)=> {
  return Object.freeze({
    add,
    findByEmail,
    findById,
    getItems,
    remove,
    replace,
    update
  })

   function getItems ({ max = 100, before, after } = {}) {
    //  return new Promise(function (resolve, reject) {
    //   database.find().then((result) => {
    //     console.log("called result: ",result);
        
    //         resolve({
    //           success: true,
    //           result
    //         });
    //   }).catch((error)=>{
    //     console.log("call result: " ,error);
        
    //       reject(error);
    //   })

    //  })
    
        try {
        
          const result =  database.find().exec();
          return {
            success: true,
            result
          }
        } catch (mongoError) {
          console.log("[contact list js] actual error->", mongoError,"the message is",mongoError.message);
          
          // const [errorCode] = mongoError.message.split(':');
         
          // if (errorCode === 'E11000') {
           
          //   const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
          //   console.log("the mongoIndex is:",mongoIndex,"adad",_);
          //   throw new Error("Unique contiane error")
            // throw new UniqueConstraintError(
            //   mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId'
            // )
          // }
          
          throw new UniqueConstraintError('emailAddress')
          throw new Error(mongoError.message);
          
          // throw mongoError;
        }
  }

  async function add (modelInstance) {
      try {
      
        const user = new database(modelInstance);
        const result = await user.save();
        console.log("the result is: ", result);
        return {
          success: result.ok === 1,
          result
        }
      } catch (mongoError) {
        const [errorCode] = mongoError.message.split(' ')
        console.log("the error code: ", mongoError.message);
        const slitData = mongoError.message.split(':');
        console.log("the split is",slitData);

        if (errorCode === 'E11000') {
          const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
          console.log("the error",mongoIndex);
          
          throw new UniqueConstraintError(
            mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId'
          )
        }
        throw mongoError;
      }

  }

  async function findById ( Id ) {
    try {
      const result = await database.findById(Id);
      console.log("the result is: ", result);
      return {
        success: result.ok === 1,
        result
      }
    }catch (mongoError) {
      const [errorCode] = mongoError.message.split(' ')
      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
        throw new Error("Unique contiane error")
      }
      throw mongoError;
    }
  }

  async function findByEmail ({ emailAddress }) {
    try {
      const result = await database.findOne({ email:emailAddress });
      console.log("the result is: ", result);
      return {
        success: result.ok === 1,
        result
      }
    }catch (mongoError) {
      const [errorCode] = mongoError.message.split(' ')
      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
        throw new Error("Unique contiane error")
      }
      throw mongoError;
    }
  }

  async function remove (id) {
      try {
        const result = await await database.findOneAndDelete(id,{new:true});
        console.log("the result is: ", result);
        return {
          success: result.ok === 1,
          result
        }
      }catch (mongoError) {
        const [errorCode] = mongoError.message.split(' ')
        if (errorCode === 'E11000') {
          const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
          throw new Error("Unique contiane error")
        }
        throw mongoError;
      }
  }

  // todo:
  async function replace (contact) {}

  // todo:
  async function update (id,updateBody) {
    try {
      const result = await database.findByIdAndUpdate(id, updateBody, {new:true});
      console.log("the result is: ", result);
      return {
        success: result.ok === 1,
        result
      }
    }catch (mongoError) {
      const [errorCode] = mongoError.message.split(' ')
      if (errorCode === 'E11000') {
        const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
        throw new Error("Unique contiane error")
      }
      throw mongoError;
    }
  }
}
