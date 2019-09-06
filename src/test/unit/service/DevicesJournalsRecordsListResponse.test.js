import {describe} from "mocha";
import {assert} from "chai";
import {DevicesJournalsRecordsListResponse} from "../../../service/DevicesJournalsRecordsListResponse";

describe('Service', function () {
    describe('DevicesJournalsRecordsListResponse', function () {
        it("should respond correctly", function () {
            const response = DevicesJournalsRecordsListResponse.create("12", "1", [
                {
                    "type": "temp",
                    "version": 1,
                    "value": "21",
                    "timestamp": 1567778256
                },
                {
                    "type": "temp",
                    "version": 1,
                    "value": "21",
                    "timestamp": 1567778262
                }
            ]).success();

            assert.equal(response.statusCode, 200);

            const body = JSON.parse(response.body);

            assert.equal(body.did, "12");
            assert.equal(body.jid, "1");
            assert.equal(body.records[0].type, "temp");
            assert.equal(body.records[0].version, 1);
            assert.equal(body.records[0].value, "21");
            assert.equal(body.records[0].timestamp, 1567778256);

            return true;
        });

        it("should allow to create failure response", function () {
            const response = DevicesJournalsRecordsListResponse.create().failure("test error", "TEST_ERROR");

            assert.equal(response.statusCode, 400);

            const body = JSON.parse(response.body);
            assert.equal(body.status, "ERROR");
            assert.equal(body.errorMessage, "test error");
            assert.equal(body.errorCode, "TEST_ERROR");

            return true;
        });

    });
});

