const AwshErrors = {
    NOT_FOUND: "ERROR_NOTFOUND",
    INTERNAL: "ERROR_INTERNAL",
    DUPLICATE_RESOURCE: "DUPLICATE_RESOURCE",
    FORMAT_INVALID: "FORMAT_INVALID"
};

class AWSHError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

class AWSHInternalError extends AWSHError {
    constructor(message = "") {
        super(message);
        this.errorCode = AwshErrors.INTERNAL;
    }
}

class AWSHNotFoundError extends AWSHError {
    constructor(message = "") {
        super(message);
        this.errorCode = AwshErrors.NOT_FOUND;
    }
}

class AWSHDuplicateResourceError extends AWSHError {
    constructor(message = "") {
        super(message);
        this.errorCode = AwshErrors.DUPLICATE_RESOURCE;
    }
}

class AWSHFormatInvalidError extends AWSHError {
    constructor(message = "") {
        super(message);
        this.errorCode = AwshErrors.FORMAT_INVALID;
    }
}

export {AWSHInternalError, AWSHNotFoundError, AWSHDuplicateResourceError, AWSHFormatInvalidError};
