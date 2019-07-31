import * as database from "awshlib/database";
import * as response from "./service/response";
import {IdGenerator} from "./ids/idGenerator";
import {IdTransformer} from "./ids/idTransformer";
import {DispenseRequest} from "./service/dispenseRequest";
import {InitRequest} from "./service/initRequest";

/**
 * Initialize an idtag.
 *
 * @param event
 * @returns {Promise<{code: *, message: *, status: string}|{body: string, response: *}>}
 */
export async function init(event) {

    try {
        const request = new InitRequest(event);

        const idGenerator = new IdGenerator(database);
        const idTransformer = new IdTransformer(database);

        await idGenerator.init(request.idtag);
        await idTransformer.init(request.idtag, request.salt, request.min_length);

        return response.success({
            idtag: request.idtag
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
        const request = new DispenseRequest(event);

        const idGenerator = new IdGenerator(database);
        const idTransformer = new IdTransformer(database);

        const newId = await idGenerator.getNext(request.idtag);

        return response.success(await idTransformer.transform(request.idtag, newId));

    } catch (err) {
        return response.failure(err.message, err.errorCode);
    }
}
