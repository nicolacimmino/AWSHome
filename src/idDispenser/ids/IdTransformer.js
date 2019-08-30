import Hashids from "hashids";
import * as errors from "awshlib/errors";

class IdTransformer {
    /**
     *
     * @param idtag
     * @param id
     * @param salt
     * @param min_length
     * @returns {{idtag: *, id: *, encoded: (string|*|Uint8Array)}}
     */
    static transform(idtag, id, salt, min_length) {
        if (!salt) {
            throw new errors.AWSHInternalError("Invalid salt value");
        }

        if (!min_length) {
            throw new errors.AWSHInternalError("Invalid min_length value");
        }

        var hashids = new Hashids(salt, min_length);

        return {
            id: id,
            idtag: idtag,
            encoded: hashids.encode([id])
        };
    }

    static decode(idtag, encoded, salt, min_length) {
        if (!salt) {
            throw new errors.AWSHInternalError("Invalid salt value");
        }

        if (!min_length) {
            throw new errors.AWSHInternalError("Invalid min_length value");
        }

        var hashids = new Hashids(salt, min_length);

        var id = hashids.decode(encoded)[0];

        if(id === undefined) {
            throw new errors.AWSHFormatInvalidError("Encoded id is not valid.");
        }

        return {
            id: id,
            idtag: idtag,
            encoded: encoded
        };
    }
}

export {IdTransformer};
