import AWS from "aws-sdk";

// TODO: change to class

/**
 *
 * @returns {AWS.DynamoDB.DocumentClient}
 */
export function getDatabase() {
    return (process.env.SLS_STAGE === "test") ?
        new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
            accessKeyId: 'DEFAULT_ACCESS_KEY',
            secretAccessKey: 'DEFAULT_SECRET'
        })
        : new AWS.DynamoDB.DocumentClient();

}

/**
 *
 * @param action
 * @param params
 * @returns {Promise<ManagedUpload.SendData>}
 */
export function execute(action, params) {
    const db = getDatabase();
    return db[action](params).promise();
}

/**
 *
 * @param name
 * @returns {string}
 */
export function getFullTableName(name) {
    return "awshome-" + process.env.SLS_STAGE + "-" + name;
}