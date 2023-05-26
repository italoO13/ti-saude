import Joi from 'joi'

const inputUser = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.base': '422|"name" must be a string',
    'string.min': '422|"name" length must be at least 3 characters long',
    'string.empty': '400|"name" is required',
    'any.required': '400|"name" is required'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': '400|All fields must be filled',
    'string.required': '400|All fields must be filled',
    'string.email': '401|Incorrect email or password'
  }),
  password: Joi.string().min(8).required().messages({
    'string.base': '422|"password" must be a string',
    'string.min': '422|"password" length must be at least 8 characters long',
    'string.empty': '400|"password" is required',
    'any.required': '400|"password" is required'
  }),
  crm: Joi.string().required().messages({
    'string.base': '422|"CRM" must be a string',
    'string.empty': '400|"CRM" is required',
    'any.required': '400|"CRM" is required'
  })
})

export default inputUser
