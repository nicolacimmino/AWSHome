import {Response} from "awshlib/response";

class StoreResponse extends Response {

    static create(did, jid, timestamp) {
        const storeResponse = new StoreResponse();

        storeResponse.responseObject = {
            did: did,
            jid: jid,
            timestamp: timestamp
        };

        return storeResponse;
    }
}

export {StoreResponse};
