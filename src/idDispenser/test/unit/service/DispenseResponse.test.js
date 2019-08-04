import {describe} from "mocha";
import {DispenseResponse} from "../../../service/DispenseResponse";
import {assert} from "chai";

describe('Service', function () {
    describe('DispenseResponse', function () {
        it("should respond correctly", function () {
            const response = DispenseResponse.create("unitest", 10, "sdfjkl34j234j", 8).success();

            assert.equal(response.status, "OK");
            assert.equal(response.response.id, 10);
            assert.equal(response.response.idtag, "unitest");
            assert.equal(response.response.encoded, "5YXd4XZ0");

            return true;
        });
    });
});

