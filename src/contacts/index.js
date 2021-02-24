// import makeDb from '../db'
// 'use strict';
// const makeContactList = require('./contact-list');
const makeContactsEndpointHandler = require( './contacts-endpoint');
const User = require('../model/user.model');
const { interactWithDB } = require('./contact-list');
const data ="";
const contactList = interactWithDB( User);
const contactsEndpointHandler = makeContactsEndpointHandler({ contactList })

module.exports =contactsEndpointHandler
