const { fetchContacts } = require("./services");


const getAllContacts = async (req, res, next) => {
    try {
    const contacts = await fetchContacts();
    console.log("in getAllContacts" , contacts)
    res.json({
    message: 'Contacts list',
    contacts
    })
        
    } catch (error) {
        next(error)    
    }


}

const getContact = async (req, res, next) => {

}

const createContact = async (req, res, next) => {

}

const putContact = async (req, res, next) => {

}

const patchContact = async (req, res, next) => {

}

const deleteContact = async (req, res, next) => {

}

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    putContact,
    patchContact,
    deleteContact
}