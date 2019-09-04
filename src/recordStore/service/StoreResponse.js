import {Response} from "awshlib/response";

class StoreResponse extends Response {

    static create(gid, did, jid, timestamp) {
        const storeResponse = new StoreResponse();

        storeResponse.responseObject = {
            gid: gid,
            did: did,
            jid: jid,
            timestamp: timestamp
        };

        return storeResponse;
    }
}

export {StoreResponse};
