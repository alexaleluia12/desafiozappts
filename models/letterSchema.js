const Joi = require('joi');

module.exports = Joi.object({
    owner: Joi.string().required(),
    text: Joi.string().required(),
});