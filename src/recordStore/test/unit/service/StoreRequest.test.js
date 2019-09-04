import {describe} from "mocha";
import * as errors from "awshlib/errors";
import {assert} from "chai";
import {StoreRequest} from "../../../service/StoreRequest";

describe('Service', function () {
    describe('StoreRequest', function () {
        it("should parse correctly", function () {
            const request = new StoreRequest({
                gid: "19",
                did: "12",
                jid: "1",
                payload: {
                    version: 1,
                    timestamp: 12345,
                    type: "temp",
                    value: "12"
                }
            });

            assert.equal(request.did, "12");
            assert.equal(request.jid, "1");
            assert.equal(request.timestamp, 12345);

            return true;
        });

        it("should fail validation - did", function () {
            assert.throws(function () {
                new StoreRequest({
                    gid: "19",
                    nodid: "12",
                    jid: "1",
                    payload: {
                        version: 1,
                        timestamp: 12345,
                        type: "temp",
                        value: "12"
                    }
                });
            }, errors.AWSHFormatInvalidError, "did", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - jid", function () {
            assert.throws(function () {
                new StoreRequest({
                    gid: "19",
                    did: "12",
                    nojid: "1",
                    payload: {
                        version: 1,
                        timestamp: 12345,
                        type: "temp",
                        value: "12"
                    }
                });
            }, errors.AWSHFormatInvalidError, "jid", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - payload version", function () {
            assert.throws(function () {
                new StoreRequest({
                    gid: "19",
                    did: "12",
                    jid: "1",
                    payload: {
                        version: 2,
                        timestamp: 12345,
                        type: "temp",
                        value: "12"
                    }
                });
            }, errors.AWSHFormatInvalidError, "version", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - payload is string", function () {
            assert.throws(function () {
                new StoreRequest({
                    gid: "19",
                    did: "12",
                    jid: "1",
                    payload: "{version: 2,timestamp: 12345,type: \"temp\",value: \"12\"}"
                });
            }, errors.AWSHFormatInvalidError, "\"payload\" must be an object", "Error AWSHFormatInvalidError expected");

            return true;
        });
    });
});

