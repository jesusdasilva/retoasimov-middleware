import { HTTP_STATUS_CODES } from "./config.js";

/**
 * RESPONSE FORMAT
 */
export function responseFormat(_, res) {
	const { httpStatus, data = {}, message } = res.locals

	res.status(httpStatus).json({
		data,
		message,
	})
}

/**
 * ERROR HANDLER
 */
export function errorHandler(err, req, res, next) {	
	console.log(err)
	
	res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
		data: {},
		message: { text: "Algo salió mal!", type: "error" }
	});
}

/**
 * VALIDATE REQUEST
 */

import Joi from 'joi'

function validateRequest(req, res, next, schema, type = 'body' ) {

	const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    }

    const { error, value } = (type === 'body') ? schema.validate(req.body, options) : schema.validate(req.query, options);
    
	if (error) {
		return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
			message: error.details.map(e => e.message.replaceAll('"', '')).join(',')
		})
    
	} else {
        req.body = value;
    
		next();
    }
}

export function validateParams(req, res, next) {
	const schema = Joi.object({
		rFirstName: Joi.string().required().messages({"string.empty": `"rFirst no pude estar vacío`, "any.required": `"rFirst es requerido`}),
		rLastName: Joi.string().empty(''),
		rEmail: Joi.string().email().required().messages({"string.empty": `"rEmail no pude estar vacío`, "any.required": `"rEmail es requerido`}),
		rPhone: Joi.string().empty(''),
		rHour: Joi.string().required().messages({"string.empty": `"rHour no pude estar vacío`, "any.required": `"rHour es requerido`}),
		rDay: Joi.string().required().messages({"string.empty": `"rDay no pude estar vacío`, "any.required": `"rDay es requerido`}),
		rMonth: Joi.string().required().messages({"string.empty": `"rMonth no pude estar vacío`, "any.required": `"rMonth es requerido`}),
		rYear: Joi.string().required().messages({"string.empty": `"rYear no pude estar vacío`, "any.required": `"rYear es requerido`}),
	})

	validateRequest(req, res, next, schema)
}