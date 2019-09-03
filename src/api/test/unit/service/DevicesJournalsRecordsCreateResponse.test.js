import {describe} from "mocha";
import {assert} from "chai";
import {DevicesJournalsRecordsCreateResponse} from "../../../service/DevicesJournalsRecordsCreateResponse";

describe('Service', function () {
    describe('DecodeResponse', function () {

        it("should respond correctly", function () {
            const response = DevicesJournalsRecordsCreateResponse.create("12", "1", 1234567).created();

            assert.equal(response.statusCode, 201);

            const body = JSON.parse(response.body);
            assert.equal(body.did, "12");
            assert.equal(body.jid, "1");
            assert.equal(body.timestamp, 1234567);

            return true;
        });

        it("should allow to create failure response", function () {
            const response = DevicesJournalsRecordsCreateResponse.create().failure("test error", "TEST_ERROR");

            assert.equal(response.statusCode, 400);

            const body = JSON.parse(response.body);
            assert.equal(body.status, "ERROR");
            assert.equal(body.errorMessage, "test error");
            assert.equal(body.errorCode, "TEST_ERROR");

            return true;
        });

    });
});

