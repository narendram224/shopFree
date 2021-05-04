
// const makeHttpError  = require('../helpers/http-error');
const { UniqueConstraintError,InvalidPropertyError,RequiredParameterError}  = require( '../helpers/errors');
const {makeContact} = require('./contact');
const { makeHttpError } = require('../helpers/http-error');

module.exports = function makeContactsEndpointHandler ({ contactList }) {
  return async function handle (httpRequest,validator) {
    
    switch (httpRequest.method) {
      case 'POST':
        return postContact(httpRequest)

      case 'GET':
        return getContacts(httpRequest)

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        })
    }
  }

  async function getContacts (httpRequest) {
    const { id } = httpRequest.pathParams || {}
    // const { max, before, after } = httpRequest.queryParams || {}
    try {
      
      const result = id
      ? await contactList.findById({ contactId: id })
      : await contactList.getItems()      
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify(result)
    }
    } catch (error) {
      throw new Error(error.message);
    }
   
  }

  async function postContact (httpRequest) {

    let contactInfo = httpRequest.body
    
    if (!contactInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.'
      })
    }

    if (typeof httpRequest.body === 'string') {
      try {
        contactInfo = JSON.parse(contactInfo)
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.'
        })
      }
    }

    try {
      const contact = makeContact(contactInfo);
      console.log("the contact is",contact);
      
      const result = await contactList.add(contact)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      }
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
              e instanceof RequiredParameterError
              ? 400
              : 500
      })
    }
  }
}
