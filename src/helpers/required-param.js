const { RequiredParameterError } = require("./errors")

module.exports.requiredParam =(param) => {
  throw new RequiredParameterError(param)
}
