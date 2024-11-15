const { fetchContacts, fetchContact, insertContact, updateContact, removeContact } = require("./services");


const getAllContacts = async (req, res, next) => {
    try {
    const contacts = await fetchContacts();
    console.log("Contacts:" , contacts)
    res.json({
    message: 'Contacts list',
    contacts
    })
        
    } catch (error) {
        next(error)    
    }


}

const getContact = async (req, res, next) => {
    try {
        console.log("params in getContact:", req.params);
        const contact = await fetchContact(req.params.contactId);
        console.log("Contact in getContact", contact)

        if (contact) {
            res.json({
            message: "contact by ID",
            contact
        })
        } else {
            next()
        }
        
    } catch (error) {
        next (error)
        
    }

}

const createContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body

        const result = await insertContact({ name, email, phone })
        res.status(201).json({
            message: "Contact created:",
            result
        }
            )
    } catch (error) {
        // validation error - show status 400, not 500
        console.log(error)
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            res.status(400).json({
                message: 'Validation error',
                errors
             })
            
        } else {
            next(error)
            
        }

    }

}

const putContact = async (req, res, next) => {
    const id = req.params.contactId
    console.log(req.params)
    const toUpdate = req.body

    console.log(req.body)
    try {

        const result = await updateContact({ id,toUpdate });
        console.log(result)
        
        if (!result) {
            next()
        }
        
        res.json({
            message: 'Contact updated succesfully!',
            result
            })
      
        
    } catch (error) {

        // validation error - show status 400, not 500
        console.log(error)
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            res.status(400).json({
                message: 'Validation error',
                errors
             })
            
        } else {
            next(error)
            
        }
            
    }
        

}


const deleteContact = async (req, res, next) => {
    try {
        const id = req.params.contactId;
        const removed = await removeContact({ id });
        console.log(removed)

        if (!removed) {
            return res.status(404).json({
                message: `Contact with ID ${id} not found`
            });
        }

        res.json({message: "Contact deleted"})
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

const updateStatusContact = async (req, res, next) => {
    const id = req.params.contactId
    console.log(req.params)
    const toUpdate = req.body
    console.log(req.body)

    try {
        const result = await updateContact({ id, toUpdate });
        console.log(result)

        if (!result) {
        return res.status(400).json({ message: 'missing field favorite', });
        }
        res.json({
                message: 'Contact updated succesfully!',
                result
            })

    } catch (error) {

        // validation error - show status 400, not 500
        console.log(error)
        if (error.name === 'ValidationError') {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            res.status(400).json({
                message: 'Validation error',
                errors
             })
            
        } else {
            next(error)
            
        }
            
    }

}

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    putContact,
    updateStatusContact,
    deleteContact
}