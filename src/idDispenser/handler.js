import * as database from "awshlib/database";
import {IdGenerator} from "./ids/idGenerator";
import {IdTransformer} from "./ids/idTransformer";
import {InitRequest} from "./service/InitRequest";
import {InitResponse} from "./service/InitResponse";
import {DispenseResponse} from "./service/DispenseResponse";
import {DispenseRequest} from "./service/DispenseRequest";

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

        return new InitResponse(request.idtag).success();

    } catch (err) {
        return new InitResponse().failure(err.message, err.errorCode);
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

        const newId = await idGenerator.getNext(request.idtag);

        return (await DispenseResponse.create(database,request.idtag, newId)).success();

    } catch (err) {
        return (await DispenseResponse.create()).failure(err.message, err.errorCode);
    }
}
