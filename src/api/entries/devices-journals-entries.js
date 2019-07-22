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
        TableName: dynamoDbLib.getFullTableName("entries"),
        ConditionExpression: "attribute_not_exists(eid) OR attribute_not_exists(did)",
        Item: entry
    };

    try {
        await dynamoDbLib.execute("put", params);
        return api.created(entry, apiEntryTransformer.toApiFormat);
    } catch (e) {
        return api.failure({
            error: e.message
        });
    }
}


export async function list(event) {

    // TODO: verify event.pathParameters.did owns jid

    const params = {
        TableName: dynamoDbLib.getFullTableName("entries"),
        KeyConditionExpression: "jid = :jid",
        ExpressionAttributeValues: {
            ":jid": event.pathParameters.jid
        }
    };

    try {
        const result = await dynamoDbLib.execute("query", params);

        return api.successArray(result.Items, apiEntryTransformer.toApiFormat);
    } catch (e) {
        return api.failure({
            error: e.message
        });
    }
}

