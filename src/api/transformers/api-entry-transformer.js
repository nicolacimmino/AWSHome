
export function toApiFormat(entry) {
    return {
        jid: entry.jid,
        eid: entry.eid,
        payload: entry.payload
    };
}
