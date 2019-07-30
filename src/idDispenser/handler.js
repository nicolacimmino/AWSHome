import * as database from "awshlib/database";
import * as response from "./service/response";
import {IdGenerator} from "./ids/idGenerator";
import {IdTransformer} from "./ids/idTransformer";

/**
 * Initialize an idtag.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|{body: string, response: *}>}
 */
export async function init(event) {

    try {
        const idtag = event.idtag;
        const salt = event.config.salt;
        const min_length = event.config.min_length;

        const idGenerator = new IdGenerator(database);
        const idTransformer = new IdTransformer(database);

        await idGenerator.init(idtag);
        await idTransformer.init(idtag, salt, min_length);

        return response.success({
            idtag: idtag
        });

    } catch (err) {
        return response.failure(err.message, err.errorCode);
    }
}

/**
 * Dispense next id for the given idtag.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|*|Uint8Array>}
 */
export async function dispense(event) {

    try {
        const idtag = event.idtag;
        const idGenerator = new IdGenerator(database);
        const idTransformer = new IdTransformer(database);

        const newId = await idGenerator.getNext(idtag);

        return response.success(await idTransformer.transform(idtag, newId));

    } catch (err) {
        return response.failure(err.message, err.errorCode);
    }
}
