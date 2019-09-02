import {Request} from "awshlib/request";

class StoreRequest extends Request {

    constructor(event) {
        const Joi = require("@hapi/joi");

        super(event, Joi.object().keys({
            idtag: Joi.string().required(),
            encoded: Joi.string().required()
        }));

        this.idtag = event.idtag;
        this.encoded = event.encoded;
    }
}

export {StoreRequest};
