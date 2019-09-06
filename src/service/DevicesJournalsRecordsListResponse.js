import {HttpResponse} from "./HttpResponse";

class DevicesJournalsRecordsListResponse extends HttpResponse {

    static create(did, jid, records) {
        const listResponse = new DevicesJournalsRecordsListResponse();

        listResponse.responseObject = {
            did: did,
            jid: jid,
            records: records
        };

        return listResponse;
    }
}

export {DevicesJournalsRecordsListResponse};
