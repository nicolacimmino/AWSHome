import {Response} from "awshlib/response";
import {IdTransformer} from "../ids/IdTransformer";

class DecodeResponse extends Response {

    static create(idtag, encoded, id_salt, id_min_length) {
        const decodeResponse = new DecodeResponse();

        if (idtag) {
            decodeResponse.responseObject = IdTransformer.decode(idtag, encoded, id_salt, id_min_length);
        }

        return decodeResponse;
    }
}

export {DecodeResponse};
