const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
// const express = require('express');

async function readContacts() {
      const contacts = await fs.readFile("./models/contacts.json")
  const contactList = JSON.parse(contacts.toString())

  return contactList
  
}

const listContacts = async () => {

  try {
    const list = readContacts()
    return list
  } catch (error) {
    console.log(error)
  }

}

const getContactById = async (contactId) => {
  try {

    const contactList = await readContacts()
    const contact = contactList.filter(contact => contact.id === contactId)

    if (contact.length < 1) {
      console.log('No contact with this ID')
      return
    } else {
      console.log(contact)
      return contact
    }
    
  } catch (error) {
    console.log(error)
    
  }
}

const removeContact = async (contactId) => {
  try {
    const contactList = await readContacts();
    const contact = contactList.filter(contact => contact.id === contactId)
    
    if (contact.length < 1) {
      return
    } else {
        console.log(contact)
        const newList = contactList.filter(contact => contact.id !== contactId)
        await fs.writeFile("./models/contacts.json", JSON.stringify(newList, null, 2));
        console.log(`Contact with ID ${contactId} was succesfully deleted:`);
        return newList
    }

    
  } catch (error) {
    console.log("Error with deleting contact:", error)
    
  }
}

const addContact = async (body) => {
  try {
    const { name, email, phone } = body.value;
    
    // if (!name || !email || !phone) {
    //   throw new Error('Missing required fields');
    // }

    const contacts = await readContacts();

    const id = uuidv4();
    const newContact = {
      id,
      name,
      email,
      phone,
    }

    contacts.push(newContact)
    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts, null, 2));
    console.log('New contact added:', newContact);
    return newContact

  } catch (error) {
    console.log('Error with adding new contact:', error)
    
  }
}

const updateContact = async (contactId, body) => {
  try {

    const { name, email, phone } = await  body.value;
    const contacts = await readContacts();

    const updatedContact = {
        id: contactId,
        name,
        email,
        phone,
    }
    
    const updatedList = contacts.filter(contact => contact.id !== contactId)
    updatedList.push(updatedContact)
    await fs.writeFile("./models/contacts.json", JSON.stringify(updatedList, null, 2));

    console.log('Contact updated succesfully:', updatedContact);
    return updatedContact
    
  } catch (error) {
    console.log('Error with updating contact:', error)
    
  }

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
