import {describe} from "mocha";
import * as errors from "awshlib/errors";
import {InitRequest} from "../../../service/InitRequest";
import {assert} from "chai";

describe('Service', function () {
    describe('InitRequest', function () {
        it("should parse correctly", function () {
            const request = new InitRequest({
                idtag: "unitest",
                config: {
                    salt: "I1B33dFLxy1Ea0bT",
                    min_length: 8
                }
            });

            assert.equal(request.idtag, "unitest");
            assert.equal(request.salt, "I1B33dFLxy1Ea0bT");
            assert.equal(request.min_length, 8);

            return true;
        });

        it("should fail validation - idtag", function () {
            assert.throws(function () {
                new InitRequest({
                    idtagMispelled: "unitest"
                })
            }, errors.AWSHFormatInvalidError, "idtag", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - config", function () {
            assert.throws(function () {
                new InitRequest({
                    idtag: "unitest"
                })
            }, errors.AWSHFormatInvalidError, "config", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - salt", function () {
            assert.throws(function () {
                new InitRequest({
                    idtag: "unitest",
                    config: {
                        min_length: 8
                    }
                })
            }, errors.AWSHFormatInvalidError, "salt", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - min_length", function () {
            assert.throws(function () {
                new InitRequest({
                    idtag: "unitest",
                    config: {
                        salt: "I1B33dFLxy1Ea0bT"
                    }
                })
            }, errors.AWSHFormatInvalidError, "min_length", "Error AWSHFormatInvalidError expected");

            return true;
        });

    });
});

