// database functions
const Contact = require('../../models/contacts')

const fetchContacts = () => {
  return Contact.find()
}

const fetchContact = (id) => {
  console.log("in fetch contact ID:", id)
  return Contact.findOne({
    _id: id,
  })

}

const insertContact = ({ name, email, phone }) => {
  return Contact.create({
    name,
    email, 
    phone,
    favorite: false
  })

}

const updateContact = ({ id, toUpdate }) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: toUpdate },
    {
      new: true,
      runValidators: true,
      // upsert:false
    }
  
  )

}

const removeContact = ({ id }) => {
  return Contact.findByIdAndDelete({
    _id: id
  })

}

module.exports = {
    fetchContacts,
    fetchContact,
    insertContact,
    updateContact,
    removeContact
}