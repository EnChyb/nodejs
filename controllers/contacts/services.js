// database functions
const Contact = require('../../models/contacts')

const fetchContacts = () => {
    try {
        const ble = Contact.find()
        console.log("fetch contacts in services", ble)
        return ble
    // const fetchedContacts = await Contact.getAll();
    // console.log('Fetched contacts:', fetchedContacts)
    // return fetchedContacts
    
  } catch (error) {
    console.log(error)
  }

}

const fetchContact = () => {

}

const insertContact = () => {

}

const updateContact = () => {

}

const removeContact = () => {

}

module.exports = {
    fetchContacts,
    fetchContact,
    insertContact,
    updateContact,
    removeContact
}