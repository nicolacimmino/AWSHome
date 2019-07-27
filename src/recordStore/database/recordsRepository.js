import * as database from "../lib/database.js";
import GroupTransformer from "../transformers/groupTransformer";

class RecordsRepository {
    async createGroup(group) {

        group.gid = '123';

        var groupDatabaseEntry = GroupTransformer.toDatabaseEntry(group);

        const params = {
            TableName: database.getFullTableName("entries"),
            ConditionExpression: "attribute_not_exists(pk)",
            Item: groupDatabaseEntry
        };

        await database.execute("put", params);

        return GroupTransformer.toGroup(groupDatabaseEntry);
    }
}

export {RecordsRepository};
