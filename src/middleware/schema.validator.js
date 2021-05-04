const Joi = require('joi');

const SchemaValidator = (schema, property) => {

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: true // remove unknown props
};
  
  return (req, res, next) => {

  //   const schema = Joi.object({
  //     a: Joi.string()
  // });
  
  


  const { error, value,errors } = schema.validate(req[property],options);
console.log("The string Data is",error);
// console.log("the value",value);




    const valid = error == null;
    if (valid) {
      
      next();
    } else {
      
      
        const { details } = error;
        const message = details.map(i => i.message).join(',');

      res.status(422).json({
        error: message 
      })
    }
  }
}

module.exports = SchemaValidator;