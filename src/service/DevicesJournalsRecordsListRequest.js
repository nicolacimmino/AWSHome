import {Request} from "./Request";

class DevicesJournalsRecordsListRequest extends Request {

    constructor(event) {
        const Joi = require("@hapi/joi");

        let requestData = event.pathParameters;

        super(requestData, Joi.object().keys({
            did: Joi.string().required(),
            jid: Joi.string().required()
        }));

        this.did = requestData.did;
        this.jid = requestData.jid;
    }
}

export {DevicesJournalsRecordsListRequest};
