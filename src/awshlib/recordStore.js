const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

// TODO: add base class "ServiceInvoker" providing stuff like function name resolution and error translation.

class RecordStore {
    constructor(stage) {
        this.stage = stage;
    }

    async store(gid, did, jid, payload) {
        const params = {
            FunctionName: `awsh-recordstore-${this.stage}-store`,
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
            Payload: JSON.stringify({
                gid: gid,
                did: did,
                jid: jid,
                payload: payload
            })
        };

        const response = await lambda.invoke(params).promise();

        const responseObject = JSON.parse(response.Payload);

        if (responseObject.status === "ERROR") {
            throw new Error(responseObject.errorMessage);
        }

        return response;
    }
}

export {RecordStore};
