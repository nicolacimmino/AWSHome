class GroupTransformer {
    toDatabaseEntry(group) {
        return {
            pk: group.gid,
            sk: `Group#${group.gid}#`,
            attributes: group
        };
    }

    toGroup(databaseEntry) {
        return databaseEntry.attributes;
    }
}

export {GroupTransformer};
