import * as errors from "awshlib/errors";

class IdGenerator {

    /**
     *
     * @param {database} database
     */
    constructor(database) {
        this.database = database;
    }

    /**
     * Returns the next id for the supplied idtag.
     *
     * @param idtag
     * @returns {Promise<number>}
     */
    async getNext(idtag) {
        try {

            let result = await this.database.execute("update", {
                "TableName": this.database.getFullTableName("iddispenser"),
                "ReturnValues": "UPDATED_NEW",
                "ExpressionAttributeValues": {
                    ":increment": 1
                },
                "ExpressionAttributeNames": {
                    "#value": "last_sequential"
                },
                "UpdateExpression": "SET #value = #value + :increment",
                "Key": {
                    "idtag": idtag
                }
            });

            return result.Attributes.last_sequential;
        } catch (err) {
            console.error(err);

            if (err.message === "The provided expression refers to an attribute that does not exist in the item") {
                throw new errors.AWSHNotFoundError(`idtag ${idtag} was not found in database. Ensure init is called for this idtag.`);
            }

            throw new errors.AWSHInternalError();
        }
    }

}

export {IdGenerator};
