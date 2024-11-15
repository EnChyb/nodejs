const Joi = require('joi');
const nameSurnamePattern = /^[A-Za-z]+\s+[A-Za-z]+$/;
const patternPhone = /^\(\d{3}\) \d{3}-\d{4}$/;



const schemaContact = Joi.object({
    name: Joi.string().pattern(nameSurnamePattern).min(2).required().messages({
        "string.empty": "Name field is required",
        "string.pattern.base": "Name must contain at least two words (first and last name), use only letters.",
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).messages({
        "string.email": "Please enter a valid email",
    }),
    phone: Joi.string().pattern(patternPhone).messages({
        "any.messages": "Please enter a valid phone number",
    }),
    favorite: Joi.boolean(),
})

const schemaStatus = Joi.object({
    favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
  }),

})

module.exports = {
    schemaContact,
    schemaStatus
}