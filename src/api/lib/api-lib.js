export function success(responseObject) {
    return buildResponse(200, {
        status: 'OK',
        response: responseObject
    });
}

export function failure(responseObject) {
    return buildResponse(400, {
        status: 'ERROR',
        response: responseObject
    });
}

function buildResponse(statusCode, responseObject) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(responseObject, null, 2)
    };
}