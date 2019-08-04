import {Request} from "awshlib/request";

class DispenseRequest extends Request {

    constructor(event) {
        const Joi = require("@hapi/joi");

        super(event, Joi.object().keys({
            idtag: Joi.string().required()
        }));

        this.idtag = event.idtag;
    }
}

export {DispenseRequest};
