import {DevicesJournalsRecordsCreateRequest} from "./service/DevicesJournalsRecordsCreateRequest";
import {DevicesJournalsRecordsCreateResponse} from "./service/DevicesJournalsRecordsCreateResponse";
import {RecordStore} from "awshlib/recordStore";

/**
 * Store a record.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|*|Uint8Array>}
 */
export async function create(event) {
    try {
        let request = new DevicesJournalsRecordsCreateRequest(event);

        const recordStore = new RecordStore("dev");

        await recordStore.store("17", request.did, request.jid, request.payload);

        return DevicesJournalsRecordsCreateResponse.create(request.did, request.jid, request.timestamp).created();

    } catch (err) {
        return DevicesJournalsRecordsCreateResponse.create().failure(err.message, err.errorCode);
    }
}
