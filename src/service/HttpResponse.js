import {Response} from "./Response";

class HttpResponse extends Response {

    success() {
        return {
            statusCode: 200,
            body: JSON.stringify(this.responseObject, null, 2)
        };
    }

    created() {
        return {
            statusCode: 201,
            body: JSON.stringify(this.responseObject, null, 2)
        };
    }


    failure(errorMessage, errorCode) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                status: 'ERROR',
                errorMessage: errorMessage,
                errorCode: errorCode
            }, null, 2)
        };
    }
}

export {HttpResponse};