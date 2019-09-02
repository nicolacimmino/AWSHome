import {StoreRequest} from "./service/StoreRequest";
import {StoreResponse} from "./service/StoreResponse";
import {RecordRepository} from "./repositories/RecordRepository";
import * as database from "awshlib/database";

/**
 * Store a record.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|*|Uint8Array>}
 */
export async function store(event) {
    try {
        let request = new StoreRequest(event);

        const recordRepository = new RecordRepository(database);

        await recordRepository.storeRecord("1",request.did, request.jid, request.timestamp, request.payload);

        return StoreResponse.create(request.did, request.jid, request.payload.timestamp).success();

    } catch (err) {
        return (await StoreResponse.create()).failure(err.message, err.errorCode);
    }
}
