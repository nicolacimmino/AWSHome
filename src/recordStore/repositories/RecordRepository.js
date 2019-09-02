import * as errors from "awshlib/errors";

class RecordRepository {
    /**
     *
     * @param {database} database
     */
    constructor(database) {
        this.database = database;
    }

    /**
     * Stores a new record.
     *
     * @returns {Promise<{gid: *, payload: *, sk: string}>}
     *
     * @param gid
     * @param did
     * @param jid
     * @param timestamp
     * @param payload
     */
    async storeRecord(gid, did, jid, timestamp, payload) {
        try {
            const record = {
                gid: gid,
                sk: `Record#${did}#${jid}#${timestamp}#`,
                payload: payload
            };

            await this.database.execute("put", {
                "TableName": this.database.getFullTableName("recordstore"),
                Item: record
            });

            return record;
        } catch (err) {
            console.error(err);

            if (err.message === "The provided expression refers to an attribute that does not exist in the item") {
                throw new errors.AWSHNotFoundError(`record is not valid.`);
            }

            throw new errors.AWSHInternalError();
        }
    }
}

export {RecordRepository};
