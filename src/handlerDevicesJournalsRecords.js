import {DevicesJournalsRecordsCreateRequest} from "./service/DevicesJournalsRecordsCreateRequest";
import {DevicesJournalsRecordsCreateResponse} from "./service/DevicesJournalsRecordsCreateResponse";
import {RecordsRepository} from "./database/RecordsRepository";
import * as database from "./database/database";
import {DevicesJournalsRecordsListRequest} from "./service/DevicesJournalsRecordsListRequest";
import {DevicesJournalsRecordsListResponse} from "./service/DevicesJournalsRecordsListResponse";

/**
 * Store a record.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|*|Uint8Array>}
 */
export async function create(event) {
    try {
        let request = new DevicesJournalsRecordsCreateRequest(event);

        let recordsRepository = new RecordsRepository(database);

        await recordsRepository.storeRecord("17", request.did, request.jid, request.timestamp, request.payload);

        return DevicesJournalsRecordsCreateResponse.create(request.did, request.jid, request.timestamp).created();

    } catch (err) {
        return DevicesJournalsRecordsCreateResponse.create().failure(err.message, err.errorCode);
    }
}

/**
 * Get all records.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|*|Uint8Array>}
 */
export async function list(event) {
    try {
        let request = new DevicesJournalsRecordsListRequest(event);

        let recordsRepository = new RecordsRepository(database);

        const records = await recordsRepository.getRecords("17", request.did, request.jid);

        return DevicesJournalsRecordsListResponse.create(request.did, request.jid, records).success();

    } catch (err) {
        return DevicesJournalsRecordsListResponse.create().failure(err.message, err.errorCode);
    }
}
