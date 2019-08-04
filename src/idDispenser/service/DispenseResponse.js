import {Response} from "awshlib/response";
import {IdTransformer} from "../ids/idTransformer";

class DispenseResponse extends Response {

    static async create(database, idtag, newId) {
        const dispenseResponse = new DispenseResponse();

        if (database === undefined) {
            return dispenseResponse;
        }

        const idTransformer = new IdTransformer(database);

        dispenseResponse.responseObject = await idTransformer.transform(idtag, newId);

        return dispenseResponse;
    }
}

export {DispenseResponse};
