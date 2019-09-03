import {HttpResponse} from "./HttpResponse";

class DevicesJournalsRecordsCreateResponse extends HttpResponse {

    static create(did, jid, timestamp) {
        const storeResponse = new DevicesJournalsRecordsCreateResponse();

        storeResponse.responseObject = {
            did: did,
            jid: jid,
            timestamp: timestamp
        };

        return storeResponse;
    }
}

export {DevicesJournalsRecordsCreateResponse};
