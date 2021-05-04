const handleContactsRequest = require('../contacts');
const { adaptRequest } = require('../helpers/adapt-request');
const Joi = require('joi');

module.exports.authController =(req,res)=>{

  const schema = Joi.object({
    a: Joi.string()
});

const { error, value } = schema.validate({ a: 'a string' });

console.log("The string",error,value);

    const httpRequest = adaptRequest(req)
    handleContactsRequest(httpRequest,"shubh")
    
      .then(({ headers, statusCode, data }) =>{
        res
          .set(headers)
          .status(statusCode)
          .send(data)
      })
      .catch(e => {
    console.log("called catch call",e.message);
    let actualError = e.message
        res.status(500).json({
        success:false,
        error:actualError
      }).end()})
}