
/**
 * Success response with a single item.
 *
 * @param responseObject
 * @param transformer The transformer to be used to turn the object into an API representation.
 * @returns {{body: string, statusCode: *}}
 */
export function success(responseObject, transformer = identityTransformer) {
    return buildResponse(200, {
        status: 'OK',
        response: transformer(responseObject)
    });
}

/**
 * Success response with an array of items.
 *
 * @param responseObjects
 * @param transformer The transformer to be used to turn the objects into an API representation.
 * @returns {{body: string, statusCode: *}}
 */
export function successArray(responseObjects, transformer = identityTransformer) {
    return buildResponse(200, {
        status: 'OK',
        response: responseObjects.map(transformer)
    });
}

/**
 * Item created response with a single item.
 *
 * @param responseObject
 * @param transformer The transformer to be used to turn the object into an API representation.
 * @returns {{body: string, statusCode: *}}
 */
export function created(responseObject, transformer = identityTransformer) {
    return buildResponse(201, {
        status: 'OK',
        response: transformer(responseObject)
    });
}

/**
 * Failure response with a single item.
 *
 * @param responseObject
 * @param transformer The transformer to be used to turn the object into an API representation.
 * @returns {{body: string, statusCode: *}}
 */
export function failure(responseObject, transformer = identityTransformer) {
    return buildResponse(400, {
        status: 'ERROR',
        response: transformer(responseObject)
    });
}

/**
 * Build the response object to be sent back to AWS API Gateway.
 * @param statusCode
 * @param responseObject
 * @returns {{body: string, statusCode: *}}
 */
function buildResponse(statusCode, responseObject) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(responseObject, null, 2)
    };
}

/**
 * Identity transformer used as default for calls that don't provide a transformer.
 *
 * @param object
 * @returns {*}
 */
function identityTransformer(object) {
    return object;
}
