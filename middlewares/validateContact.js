const { schemaContact, schemaStatus } = require("./joiSchemas")


const validateContact = (req, res, next) => {
    const { error } = schemaContact.validate(req.body)
    
    // catch error if validation failed
    if (error) {
        return res.status(400).json({
            message: 'Validation error',
            errors: error.details.map((detail => detail.message))
        })
    }

    // go to next function in route if validacion succeed
    next()

}

const validateStatus = (req, res, next) => {
    const { error } = schemaStatus.validate(req.body)
    
    // catch error if validation failed
    if (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Validation error',
            errors: error.details.map((detail => detail.message))
        })
    }

    // go to next function in route if validacion succeed
    next()

}

module.exports = {
    validateContact,
    validateStatus
}