import {DecodeRequest} from "./service/StoreRequest";
import {StoreResponse} from "./service/StoreResponse";

/**
 * Decode an encoded id for the given idtag.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|*|Uint8Array>}
 */
export async function store(event) {
    try {
        let request = new DecodeRequest(event);

        return StoreResponse.create(request.idtag, request.encoded, process.env.ID_SALT, process.env.ID_MIN_LENGTH).success();

    } catch (err) {
        return (await StoreResponse.create()).failure(err.message, err.errorCode);
    }
}
