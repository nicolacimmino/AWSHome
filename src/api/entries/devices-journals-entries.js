import uuid from "uuid";
import * as dynamoDbLib from "../lib/dynamodb-lib";
import * as api from "../lib/api-lib";
import * as apiEntryTransformer from "../transformers/api-entry-transformer";

export async function create(event) {

    // TODO: verify event.pathParameters.did owns jid

    const entry = {
        jid: event.pathParameters.jid,
        eid: uuid.v1(),
        createdAt: Date.now(),
        payload: JSON.parse(event.body)
    };

    const params = {
        TableName: dynamoDbLib.getFullTableName("entries", event.requestContext.stage),
        ConditionExpression: "attribute_not_exists(eid) OR attribute_not_exists(did)",
        Item: entry
    };

    try {
        await dynamoDbLib.execute("put", params);
        return api.success(apiEntryTransformer.toApiFormat(entry));
    } catch (e) {
        return api.failure({
            error: e.message
        });
    }
}
