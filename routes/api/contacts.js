const express = require('express');

// const Joi = require('joi');
const {getAllContacts, getContact, createContact, putContact, deleteContact} = require('../../controllers/contacts/index')



const router = express.Router()

// const schema = Joi.object({
//   name: Joi.string().alphanum().min(2).required(),
//   email: Joi.string().email({ minDomainSegments: 2 }).required(),
//   phone: Joi.required(),
// })

router.get('/', getAllContacts);
router.get('/:contactId', getContact);
router.post('/', createContact);
router.put('/:contactId', putContact);
router.delete('/:contactId', deleteContact)


module.exports = router
