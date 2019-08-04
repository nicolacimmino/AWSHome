import {Response} from "awshlib/response";

class InitResponse extends Response {
    constructor(idtag = undefined) {
        super();
        this.responseObject = {
            idtag: idtag
        };
    }
}

export {InitResponse};
