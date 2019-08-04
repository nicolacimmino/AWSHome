import * as errors from "./errors";

class Request {
    /**
     *
     * @param event
     * @param schema
     */
    constructor(event, schema) {
        this.event = event;
        this.schema = schema;

        this.validate();
    }

    /**
     *
     * @param event
     * @returns {boolean}
     */
    validate() {
        const Joi = require('@hapi/joi');

        const result = Joi.validate(this.event, this.schema);

        if (result.error) {
            if (result.error.isJoi !== true) {
                throw new errors.AWSHInternalError();
            }

            throw new errors.AWSHFormatInvalidError(result.error.details.reduce(function (errorMessage, error) {
                return errorMessage + error.message + ",";
            }, ""));
        }

        return true;
    }
}

export {Request};
