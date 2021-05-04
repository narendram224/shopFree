 
const Joi = require('joi');

const schemas = {
  user: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(10).required().messages(
      {
        'string.base': `user should be a type of 'text'`,
        'string.empty': `usrname cannot be an empty field`,
        'string.min': `username should have a minimum length of {#limit}`,
        'string.max': `username should have a maximum length of {#limit}`,

        'any.required': `"username" is a required field`
      }
    ),
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    password: Joi.string().min(6).messages(
      {
        'string.base': `user should be a type of 'text'`,
        'string.empty': `{#label} cannot be an an empty field`,
        'string.min': `{#label} should have a minimum length of {#limit}`,
        "string.pattern.base":"{{#label}} fails to match the required pattern: {{#regex}}",
        'any.required': `{{#label}} is a required field`
      }
    ),
    email   : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    isSeller: Joi.boolean().default(false).required(),
  }),
  blogLIST: {
    page: Joi.number().required(),
    pageSize: Joi.number().required()
  },
  blogDETAIL: {
    id: Joi.number().min(1).required()
  },
  reviews: {
    owner:Joi.string().required(),
    title:Joi.string().required(),
    description:Joi.string().alphanum().min(3).max(200).required(),
    rating:Joi.number().min(1).max(5).default(0),
  },
  order:{
    owner: Joi.string().required(),
    totalPrice:Joi.number().default(0).required(),
    Product: Joi.array()
    
    // .items(Joi.object.keys({ 
    //     description: Joi.string(), 
    //     author: Joi.string().required(), 
    //     grade: Joi.number().min(1).max(5) 
    
  },
  product:{
    name:Joi.string().required(),
    category:Joi.string().required(),
    owner:Joi.string().required(),
    reviews:Joi.array().required(),
    image:Joi.string(),
    description:Joi.string().required().min(10).max(500),
    price:Joi.number().required().default(0),
    created:Joi.date()
},
category: {
    name:Joi.string().required().lowercase(),
    created:Joi.date()
},
address: {
    name:Joi.string().alphanum().lowercase().min(2).max(30),
    add1:Joi.string().min(5),
    add2:Joi.string(),
    city: Joi.string(),
    state:Joi.string(),
    country:Joi.string(),
    postalCode:Joi.number().required().min(6).max(6),
    mobile:Joi.number().required().min(10).max(10)
}
  
  

};

module.exports = schemas;
