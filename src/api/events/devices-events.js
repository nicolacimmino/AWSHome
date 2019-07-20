import uuid from "uuid";
import * as dynamoDbLib from "../lib/dynamodb-lib";
import * as api from "../lib/api-lib";

export async function create(event) {

    const deviceEvent = {
        did: event.pathParameters.did,
        jid: event.pathParameters.jid,
        eid: uuid.v1(),
        createdAt: Date.now()
    };

    const params = {
        TableName: dynamoDbLib.getFullTableName("events", event.requestContext.stage),
        ConditionExpression: "attribute_not_exists(eid) OR attribute_not_exists(did)",
        Item: deviceEvent
    };

    try {
        await dynamoDbLib.execute("put", params);
        return api.success(deviceEvent);
    } catch (e) {
        return api.failure({
            error: e.message
        });
    }
}
