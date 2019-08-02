import {DispenseRequest} from "../../../service/dispenseRequest";

var assert = require('assert');

describe('Service.DispenseRequest', function () {
    describe('valid', function () {
        it("works", function () {
            const request = new DispenseRequest({
                idtag: "unitest"
            })

            assert.equal(request.idtag, "unitest");

            return true;
        })
    });
});

