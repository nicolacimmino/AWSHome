class Response {
    /**
     * Success response with a single item.
     *
     * @returns {{body: string, response: *}}
     */
    success() {
        return {
            status: 'OK',
            response: this.responseObject
        };
    }

    /**
     * Failure response with a single item.
     *
     * @param errorMessage
     * @param errorCode
     * @returns {{body: string, response: *}}
     */
    failure(errorMessage, errorCode) {
        return {
            status: 'ERROR',
            errorMessage: errorMessage,
            errorCode: errorCode
        };
    }

}

export {Response};
