import {describe} from "mocha";
import {assert} from "chai";
import {StoreResponse} from "../../../service/StoreResponse";

describe('Service', function () {
    describe('DecodeResponse', function () {

        it("should respond correctly", function () {
            const response = StoreResponse.create("19", "12", "1", 1234567).success();

            assert.equal(response.status, "OK");
            assert.equal(response.response.gid, "19");
            assert.equal(response.response.did, "12");
            assert.equal(response.response.jid, "1");
            assert.equal(response.response.timestamp, 1234567);

            return true;
        });

        it("should allow to create failure response", function () {
            const response = StoreResponse.create().failure("test error", "TEST_ERROR");

            assert.equal(response.status, "ERROR");
            assert.equal(response.errorMessage, "test error");
            assert.equal(response.errorCode, "TEST_ERROR");

            return true;
        });

    });
});

