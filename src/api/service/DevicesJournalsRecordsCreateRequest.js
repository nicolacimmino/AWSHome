import {Request} from "awshlib/request";

class DevicesJournalsRecordsCreateRequest extends Request {

    constructor(event) {
        const Joi = require("@hapi/joi");

        event.pathParameters.payload = event.body;

        super(event.pathParameters, Joi.object().keys({
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

        this.version = event.pathParameters.payload.version;
        this.did = event.pathParameters.did;
        this.jid = event.pathParameters.jid;
        this.timestamp = event.pathParameters.payload.timestamp;
        this.payload = event.pathParameters.payload;
    }
}

export {DevicesJournalsRecordsCreateRequest};
