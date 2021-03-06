const sqlite3 = require('sqlite3').verbose();

const { generalErrorHandler } = require('../utils');
const { DBNAME } = require('../constants');

class Letter {
    store(data) {
        const db = new sqlite3.Database(DBNAME, generalErrorHandler)

        return new Promise((resolve, reject) => {
            db.run('INSERT INTO letter (content, owner) VALUES (?, ?)', [data.text, data.owner], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    db.close(generalErrorHandler);
                    resolve(true);
                }
            });
        });
    }
}

module.exports = Letter;