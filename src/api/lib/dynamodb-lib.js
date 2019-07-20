import AWS from "aws-sdk";

export function execute(action, params) {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
}

export function getFullTableName(name, stage) {
    return "awsh-" + stage + "-" + name;
}