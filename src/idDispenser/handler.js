import * as database from "awshlib/database";
import {IdGenerator} from "./ids/idGenerator";
import {IdTransformer} from "./ids/idTransformer";

export async function init(event) {

    try {
        const idtag = event.idtag;
        const salt = event.config.salt;
        const min_length = event.config.min_length;

        const idGenerator = new IdGenerator(database);
        const idTransformer = new IdTransformer(database);

        await idGenerator.init(idtag);
        await idTransformer.init(idtag, salt, min_length);

        return {
            status: "OK",
            idtag: idtag
        };

    } catch (err) {
        return {
            status: "ERROR",
            message: err.message,
            code: err.errorCode
        };
    }
}

export async function dispense(event) {

    try {

        const idtag = event.idtag;
        const idGenerator = new IdGenerator(database);
        const idTransformer = new IdTransformer(database);

        const newId = await idGenerator.getNext(idtag);


        return await idTransformer.transform(idtag, newId);

    } catch (err) {
        return {
            status: "ERROR",
            message: err.message,
            code: err.errorCode
        };
    }
}
