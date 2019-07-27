import AWS from "aws-sdk";

/**
 *
 * @param action
 * @param params
 * @returns {Promise<ManagedUpload.SendData>}
 */
export function execute(action, params) {
    const dynamoDb = (process.env.SLS_STAGE === "test") ?
        new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
            accessKeyId: 'DEFAULT_ACCESS_KEY',
            secretAccessKey: 'DEFAULT_SECRET'
        })
        : new AWS.DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
}

/**
 *
 * @param name
 * @returns {string}
 */
export function getFullTableName(name) {
    return "awsh-" + process.env.SLS_STAGE + "-" + name;
}