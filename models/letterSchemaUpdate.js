const Joi = require('joi');

module.exports = Joi.object({
    owner: Joi.string(),
    text: Joi.string(),
    id: Joi.number().required(),
});