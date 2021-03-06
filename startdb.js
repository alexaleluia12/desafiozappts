const sqlite3 = require('sqlite3').verbose();

const { DBNAME } = require('./constants');
const { generalErrorHandler } = require('./utils');

const db = new sqlite3.Database(DBNAME, generalErrorHandler);

db.run(`
CREATE TABLE letter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content text NOT NULL,
    owner text NOT NULL
)`, generalErrorHandler);

db.close(generalErrorHandler);
