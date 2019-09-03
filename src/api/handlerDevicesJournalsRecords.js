import {DevicesJournalsRecordsCreateRequest} from "./service/DevicesJournalsRecordsCreateRequest";
import {DevicesJournalsRecordsCreateResponse} from "./service/DevicesJournalsRecordsCreateResponse";

/**
 * Store a record.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|*|Uint8Array>}
 */
export async function create(event) {
    try {
        let request = new DevicesJournalsRecordsCreateRequest(event);

        return DevicesJournalsRecordsCreateResponse.create(request.did, request.jid, request.timestamp).created();

    } catch (err) {
        return DevicesJournalsRecordsCreateResponse.create().failure(err.message, err.errorCode);
    }
}
