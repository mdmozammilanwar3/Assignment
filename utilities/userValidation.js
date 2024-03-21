const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    });

    return schema.validate(data);
};

module.exports = { registerValidation };
