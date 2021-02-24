const handleContactsRequest = require('../contacts');
const { adaptRequest } = require('../helpers/adapt-request');

module.exports.authController =(req,res)=>{
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