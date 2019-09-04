import {Request} from "awshlib/request";

class DevicesJournalsRecordsCreateRequest extends Request {

    constructor(event) {
        const Joi = require("@hapi/joi");

        let requestData = event.pathParameters;

        requestData.payload = JSON.parse(event.body);

        super(requestData, Joi.object().keys({
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

        this.version = requestData.payload.version;
        this.did = requestData.did;
        this.jid = requestData.jid;
        this.timestamp = requestData.payload.timestamp;
        this.payload = requestData.payload;
    }
}

export {DevicesJournalsRecordsCreateRequest};
