const { schemaUser, schemaEmail } = require("./joiSchemas")

const validateUser = (req, res, next) => { 
    const { error } = schemaUser.validate(req.body)
    
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

const validateEmail = (req, res, next) => {
        const { error } = schemaEmail.validate(req.body)
    
    if (error) {
        return res.status(400).json({
            message: 'Email validation error',
            errors: error.details.map((detail => detail.message))
        })
    }
    next()

}

module.exports = { validateUser, validateEmail }