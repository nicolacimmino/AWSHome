import * as dynamoDbLib from "../lib/dynamodb-lib";
import * as api from "../lib/api-lib";
import * as apiEntryTransformer from "../transformers/api-entry-transformer";
import * as entriesRepository from "../database/entries-repository";

export async function create(event) {

    // TODO: verify event.pathParameters.did owns jid

    try {
        const entry = await entriesRepository.createEntry(event.pathParameters.jid, JSON.parse(event.body));

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

