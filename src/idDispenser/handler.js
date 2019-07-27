import * as database from "awshlib/database";
import Hashids from "hashids";

export async function init(event) {

    try {

        await database.execute("put", {
            "TableName": database.getFullTableName("iddispenser"),
            ConditionExpression: "attribute_not_exists(idtag)",
            "Item": {
                "idtag": event.idtag,
                "last_sequential": 0,
                "config": {
                    "salt": event.config.salt,
                    "min_length": event.config.min_length
                }
            }
        });

        return {
            status: "OK",
            idtag: event.idtag
        };

    } catch (err) {
        if (err.message === "The conditional request failed") {
            return {
                status: "ERROR",
                message: "idtag already initialised",
                idtag: event.idtag
            };
        }

        return {
            status: "ERROR",
            message: err.message,
            idtag: event.idtag
        };
    }
}

export async function dispense(event) {

    try {

        var result = await database.execute("update", {
            "TableName": database.getFullTableName("iddispenser"),
            "ReturnValues": "ALL_NEW",
            "ExpressionAttributeValues": {
                ":increment": 1
            },
            "ExpressionAttributeNames": {
                "#value": "last_sequential"
            },
            "UpdateExpression": "SET #value = #value + :increment",
            "Key": {
                "idtag": event.idtag
            }
        });

        var hashids = new Hashids(result.Attributes.config.salt, result.Attributes.config.min_length);

        return {
            id: result.Attributes.last_sequential,
            encodedId: hashids.encode([result.Attributes.last_sequential])
        };
    } catch (err) {
        if (err.message === "The provided expression refers to an attribute that does not exist in the item") {
            return {
                status: "ERROR",
                message: "idtag not initialised",
                idtag: event.idtag
            };
        }

        return {
            status: "ERROR",
            message: err.message,
            idtag: event.idtag
        };
    }
}
