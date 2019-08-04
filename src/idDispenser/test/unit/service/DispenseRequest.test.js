import {DispenseRequest} from "../../../service/DispenseRequest";
import {describe} from "mocha";
import * as errors from "awshlib/errors";
import {assert} from "chai";

describe('Service', function () {
    describe('DispenseRequest', function () {
        it("should parse correctly", function () {
            const request = new DispenseRequest({
                idtag: "unitest"
            });

            assert.equal(request.idtag, "unitest");

            return true;
        });

        it("should fail validation", function () {
            assert.throws(function () {
                new DispenseRequest({
                    idtagMispelled: "unitest"
                })
            }, errors.AWSHFormatInvalidError, "idtag", "Error AWSHFormatInvalidError expected");

            return true;
        })
    });
});

