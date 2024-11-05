const express = require('express');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const Joi = require('joi');


const router = express.Router()

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.required(),
})

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  console.log(contacts)
  res.json({
    message: 'Contacts list',
    contacts
  
  })
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  console.log('received ID:', id)
  const contactById = await getContactById(id)
  if (!contactById) {
    console.log('if works')
    return res.status(404).json({
      message: `Contact with ID ${id} doesn't exist`
    });
  }
  console.log('ominięty if')
  res.json({
    message: `Contact with ID ${id} founded succesfully`,
    contactById
  })
})

router.post('/', async (req, res, next) => {
  const body = await req.body;
  console.log('Request body:', body)
  const validatedBody = schema.validate(body)
  console.log(validatedBody)
  try {
    const newContact = await addContact(validatedBody);

    if (validatedBody.error) {
      res.status(400).json({message: validatedBody.error.message})
      throw new Error('Failed to add contact');
    }


    res.status(201).json({
      message: 'New contact is succesfully created!',
      newContact

    })
  } catch (error) {
    console.log('Router error:', error)
  }

})

router.delete('/:contactId', async (req, res, next) => {

  try {
    const id = req.params.contactId
    console.log('received ID:', id)
    const newContacts = await removeContact(id)

    if (!newContacts) {
    return res.status(404).json({
      message: `Contact with ID ${id} not found`
    });
    }
    res.json({ message: 'contact deleted' })
  
  } catch (error) {
    console.log(error)
    
  }

})

router.put('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId
    console.log('received ID:', id)

    const body = await req.body;
    const validatedBody = schema.validate(body)

    if (validatedBody.error) {
      res.status(404).json({message: validatedBody.error.message})
      throw new Error('Failed to update contact- missing fields');
    }

    updateContact(id, validatedBody)

    res.json({ message: 'contact updated succesfully' })
    
  } catch (error) {
    console.log(error)
    
  }

})

module.exports = router
