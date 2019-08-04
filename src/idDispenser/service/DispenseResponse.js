import {Response} from "awshlib/response";
import {IdTransformer} from "../ids/IdTransformer";

class DispenseResponse extends Response {

    static create(idtag, newId, id_salt, id_min_length) {
        const dispenseResponse = new DispenseResponse();

        dispenseResponse.responseObject = IdTransformer.transform(idtag, newId, id_salt, id_min_length);

        return dispenseResponse;
    }
}

export {DispenseResponse};
