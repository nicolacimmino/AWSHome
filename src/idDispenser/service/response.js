/**
 * Success response with a single item.
 *
 * @param responseObject
 * @returns {{body: string, response: *}}
 */
export function success(responseObject) {
    return {
        status: 'OK',
        response: responseObject
    };
}

/**
 * Failure response with a single item.
 *
 * @param errorMessage
 * @param errorCode
 * @returns {{body: string, response: *}}
 */
export function failure(errorMessage, errorCode) {
    return {
        status: 'ERROR',
        errorMessage: errorMessage,
        errorCode: errorCode
    };
}

