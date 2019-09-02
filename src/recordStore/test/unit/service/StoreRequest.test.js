import {describe} from "mocha";
import * as errors from "awshlib/errors";
import {assert} from "chai";
import {DecodeRequest} from "../../../service/StoreRequest";

describe('Service', function () {
    describe('DecodeRequest', function () {
        it("should parse correctly", function () {
            const request = new DecodeRequest({
                idtag: "unitest",
                encoded: "testEncoded"
            });

            assert.equal(request.idtag, "unitest");
            assert.equal(request.encoded, "testEncoded");

            return true;
        });

        it("should fail validation - idtag", function () {
            assert.throws(function () {
                new DecodeRequest({
                    idtagMispelled: "unitest"
                })
            }, errors.AWSHFormatInvalidError, "idtag", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - encoded", function () {
            assert.throws(function () {
                new DecodeRequest({
                    idtag: "unitest"
                })
            }, errors.AWSHFormatInvalidError, "encoded", "Error AWSHFormatInvalidError expected");

            return true;
        });
    });
});

