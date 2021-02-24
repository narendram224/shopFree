const {requiredParam}  = require('../helpers/required-param');
const { InvalidPropertyError } = require('../helpers/errors');
const {isValidEmail} = require( '../helpers/is-valid-email.js');
const {upperFirst} = require('../helpers/upper-first');

module.exports.makeContact = ( contactInfo = requiredParam('contactInfo'))=> {
  
  const validContact = validate(contactInfo);
  const normalContact = normalize(validContact);
  return Object.freeze(normalContact)

  function validate ({
   username = requiredParam(contactInfo['username']),
   password=requiredParam(contactInfo['password']),
   email=requiredParam(contactInfo['email']),
    ...otherInfo
  } = {}) {
    validateName('UserName', username)
    validateName('Password', password)
    validateEmail(email)
    return { username, password, email, ...otherInfo }
  }

  function validateName (label, name) {
    if (name.length < 2) {
      console.log("called valida name",label,name);
      
      throw new InvalidPropertyError(
        ` ${label} must be at least 2 characters long.`
      )
    }
  }

  function validateEmail (email) {
    if (email.length < 4) {
      
      throw new InvalidPropertyError("Email field is required")
    }else if (!isValidEmail(email)) {
      throw new InvalidPropertyError('Invalid register email address.')
    }
  }

  function normalize ({ email, username, password, ...otherInfo }) {
    return {
      username: upperFirst(username),
      password,
      email: email.toLowerCase(),
      ...otherInfo,
    }
  }
}