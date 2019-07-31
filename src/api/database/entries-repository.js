import uuid from "uuid";
import * as database from "awshlib/database";

/**
 *
 * @param jid
 * @param payload
 * @returns {Promise<{eid, createdAt: number, jid: *, payload: *}|null>}
 */
async function createEntry(jid, payload) {
    const entry = {
        jid: jid,
        eid: uuid.v1(),
        createdAt: Date.now(),
        payload: payload
    };

    const params = {
        TableName: database.getFullTableName("entries"),
        ConditionExpression: "attribute_not_exists(eid) OR attribute_not_exists(did)",
        Item: entry
    };

    try {
        await database.execute("put", params);
        return entry;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export {createEntry};