import {describe} from "mocha";
import * as errors from "../../../errors/errors";
import {assert} from "chai";
import {DevicesJournalsRecordsCreateRequest} from "../../../service/DevicesJournalsRecordsCreateRequest";

describe('Service', function () {
    describe('DevicesJournalsRecordsCreateRequest', function () {
        it("should parse correctly", function () {
            const request = new DevicesJournalsRecordsCreateRequest({
                pathParameters: {
                    did: "12",
                    jid: "1"
                },
                body: JSON.stringify({
                    version: 1,
                    timestamp: 12345,
                    type: "temp",
                    value: "12"
                })
            });

            assert.equal(request.did, "12");
            assert.equal(request.jid, "1");
            assert.equal(request.timestamp, 12345);

            return true;
        });

        it("should fail validation - did", function () {
            assert.throws(function () {
                new DevicesJournalsRecordsCreateRequest({
                    pathParameters: {
                        jid: "1"
                    },
                    body: JSON.stringify({
                        version: 1,
                        timestamp: 12345,
                        type: "temp",
                        value: "12"
                    })
                });
            }, errors.AWSHFormatInvalidError, "did", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - jid", function () {
            assert.throws(function () {
                new DevicesJournalsRecordsCreateRequest({
                    pathParameters: {
                        did: "12",
                    },
                    body: JSON.stringify({
                        version: 1,
                        timestamp: 12345,
                        type: "temp",
                        value: "12"
                    })
                });
            }, errors.AWSHFormatInvalidError, "jid", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - payload version", function () {
            assert.throws(function () {
                new DevicesJournalsRecordsCreateRequest({
                    pathParameters: {
                        jid: "1",
                        did: "12",
                    },
                    body: JSON.stringify({
                        version: 2,
                        timestamp: 12345,
                        type: "temp",
                        value: "12"
                    })
                });
            }, errors.AWSHFormatInvalidError, "version", "Error AWSHFormatInvalidError expected");

            return true;
        });
    });
});

