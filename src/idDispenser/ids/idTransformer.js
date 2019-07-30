import Hashids from "hashids";
import * as errors from "awshlib/errors";

class IdTransformer {

    constructor(database) {
        this.database = database;
    }

    /**
     * Initialises the given idtag.
     *
     * @param idtag
     * @param salt
     * @param min_length
     * @returns {Promise<void>}
     */
    async init(idtag, salt, min_length) {
        try {

            await this.database.execute("update", {
                "TableName": this.database.getFullTableName("iddispenser"),
                "UpdateExpression": "set config = :config",
                "ExpressionAttributeValues": {
                    ":config": {
                        "salt": salt,
                        "min_length": min_length
                    }
                },
                "Key": {
                    "idtag": idtag
                }
            });
        } catch (err) {
            console.error(err);

            throw new errors.AWSHInternalError();
        }
    }

    /**
     *
     * @param idtag
     * @param id
     * @returns {Promise<*|Uint8Array>}
     */
    async transform(idtag, id) {

        try {

            let result = await this.database.execute("get", {
                "TableName": this.database.getFullTableName("iddispenser"),
                "Key": {
                    "idtag": idtag
                }
            });

            var hashids = new Hashids(result.Item.config.salt, result.Item.config.min_length);

            return {
                id: id,
                idtag: idtag,
                encoded: hashids.encode([id])
            };

        } catch (err) {
            console.error(err);

            if (err.message === "The provided expression refers to an attribute that does not exist in the item") {
                throw new errors.AWSHNotFoundError(`idtag ${idtag} was not found in database. Ensure init is called for this idtag.`);
            }

            throw new errors.AWSHInternalError();
        }
    }

}

export {IdTransformer};
