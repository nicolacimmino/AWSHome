'use strict';

import * as database from "awshlib/database";

module.exports.dispense = async event => {
    database.execute();

    return {message: 'Here is an id: 123'};
};
