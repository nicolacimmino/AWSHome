import AWS from "aws-sdk";

// TODO: remove need to pass stage.
export function execute(action, params, stage) {
    const dynamoDb = (stage === "test") ?
        new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
            accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
            secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
        })
        : new AWS.DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
}

export function getFullTableName(name, stage) {
    return "awsh-" + stage + "-" + name;
}