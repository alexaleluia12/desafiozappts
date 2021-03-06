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

    featch(letterId) {
        const db = new sqlite3.Database(DBNAME, generalErrorHandler)

        let query = 'SELECT * FROM letter';
        if (letterId) {
           query += ` WHERE id = ${letterId}`;
        }
        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    db.close(generalErrorHandler);
                    resolve(rows);
                }
            });
        });
    }

}

module.exports = Letter;