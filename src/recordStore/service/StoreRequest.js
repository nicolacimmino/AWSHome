import {Request} from "awshlib/request";

class StoreRequest extends Request {

    constructor(event) {
        const Joi = require("@hapi/joi");

        super(event, Joi.object().keys({
            gid: Joi.string().required(),
            did: Joi.string().required(),
            jid: Joi.string().required(),
            payload: Joi.object().keys({
                    version: Joi.number().required().min(1).max(1),
                    timestamp: Joi.number().required(),
                    type: Joi.string().required(),
                    value: Joi.string().required(),
                }
            )
        }));

        this.version = event.version;
        this.gid = event.gid;
        this.did = event.did;
        this.jid = event.jid;
        this.timestamp = event.payload.timestamp;
        this.payload = event.payload;
    }
}

export {StoreRequest};
