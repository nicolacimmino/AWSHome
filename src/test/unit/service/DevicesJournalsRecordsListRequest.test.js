import {describe} from "mocha";
import * as errors from "../../../errors/errors";
import {assert} from "chai";
import {DevicesJournalsRecordsListRequest} from "../../../service/DevicesJournalsRecordsListRequest";

describe('Service', function () {
    describe('DevicesJournalsRecordsListRequest', function () {
        it("should parse correctly", function () {
            const request = new DevicesJournalsRecordsListRequest({
                pathParameters: {
                    did: "12",
                    jid: "1"
                }
            });

            assert.equal(request.did, "12");
            assert.equal(request.jid, "1");

            return true;
        });

        it("should fail validation - did", function () {
            assert.throws(function () {
                new DevicesJournalsRecordsListRequest({
                    pathParameters: {
                        jid: "1"
                    }
                });
            }, errors.AWSHFormatInvalidError, "did", "Error AWSHFormatInvalidError expected");

            return true;
        });

        it("should fail validation - jid", function () {
            assert.throws(function () {
                new DevicesJournalsRecordsListRequest({
                    pathParameters: {
                        did: "12",
                    }
                });
            }, errors.AWSHFormatInvalidError, "jid", "Error AWSHFormatInvalidError expected");

            return true;
        });
    });
});

