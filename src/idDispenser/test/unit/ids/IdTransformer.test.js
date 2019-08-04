import {describe} from "mocha";
import {assert} from "chai";
import {IdTransformer} from "../../../ids/IdTransformer";
import * as errors from "awshlib/errors";

describe('IDs', function () {
    describe('IdTransformer', function () {
        it("should transform correctly", function () {
            const result = IdTransformer.transform("unitest", 10, "sdfjkl34j234j", "8");

            assert.equal(result.idtag, "unitest");
            assert.equal(result.id, 10);
            assert.equal(result.encoded, "5YXd4XZ0");

            return true;
        });

        it("should fail without salt", function () {
            assert.throws(function () {
                IdTransformer.transform("unitest", 10);

            }, errors.AWSHInternalError, "salt", "Error AWSHInternalError expected");

            return true;
        });

        it("should fail with empty salt", function () {
            assert.throws(function () {
                IdTransformer.transform("unitest", 10, "", 8);

            }, errors.AWSHInternalError, "salt", "Error AWSHInternalError expected");

            return true;
        });

        it("should fail without min_length", function () {
            assert.throws(function () {
                IdTransformer.transform("unitest", 10, "sdfjkl34j234j");

            }, errors.AWSHInternalError, "min_length", "Error AWSHInternalError expected");

            return true;
        });
    });
});

