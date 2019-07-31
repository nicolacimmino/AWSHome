import {Request} from "awshlib/request";

class InitRequest extends Request {

    constructor(event) {
        const Joi = require("@hapi/joi");

        super(event, Joi.object().keys({
            idtag: Joi.string().required(),
            config: Joi.object().keys({
                salt: Joi.string().required(),
                min_length: Joi.number().required()
            })
        }));

        this.idtag = event.idtag;
        this.salt = event.config.salt;
        this.min_length = event.config.min_length;
    }
}

export {InitRequest};
