import * as database from "awshlib/database";
import {IdGenerator} from "./ids/IdGenerator";
import {DispenseResponse} from "./service/DispenseResponse";
import {DispenseRequest} from "./service/DispenseRequest";


/**
 * Dispense next id for the given idtag.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|*|Uint8Array>}
 */
export async function dispense(event) {

    try {
        const request = new DispenseRequest(event);

        const idGenerator = new IdGenerator(database);

        const newId = await idGenerator.getNext(request.idtag);

        return DispenseResponse.create(request.idtag, newId, process.env.ID_SALT, process.env.ID_MIN_LENGTH).success();

    } catch (err) {
        return (await DispenseResponse.create()).failure(err.message, err.errorCode);
    }
}
