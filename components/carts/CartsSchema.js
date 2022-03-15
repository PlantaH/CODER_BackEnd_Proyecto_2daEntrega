import Joi from 'joi';

const timestamp = Joi.string().min(4).required()
const products = []

export default {
timestamp,
products
} 