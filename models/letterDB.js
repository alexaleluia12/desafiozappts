const sqlite3 = require('sqlite3').verbose();

const { generalErrorHandler } = require('../utils');
const { DBNAME } = require('../constants');

class Letter {
    store(data) {
        const db = new sqlite3.Database(DBNAME, generalErrorHandler);

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

    fetch(letterId) {
        const db = new sqlite3.Database(DBNAME, generalErrorHandler);

        let query = 'SELECT * FROM letter';
        const parameters = [];
        if (letterId) {
           query += ` WHERE id = ?`;
           parameters.push(letterId);
        }
        return new Promise((resolve, reject) => {
            db.all(query, parameters, (err, rows) => {
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

    delete(letterId) {
        const db = new sqlite3.Database(DBNAME, generalErrorHandler);

        let query = 'DELETE FROM letter WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [letterId], function(err){
                if (err) {
                    reject(err);
                }
                else {
                    db.close(generalErrorHandler);
                    resolve(this.changes);
                }
            });
        });
    }

    update(data) {
        const db = new sqlite3.Database(DBNAME, generalErrorHandler);

        const parameters = [];
        let query = 'UPDATE letter SET ';
        if (data.text) {
            parameters.push(data.text);
            query += ' content = ? '
        }
        if (data.owner) {
            parameters.push(data.owner);
            if (parameters.length > 1)
                query += ',';
            query += ' owner = ? '
        }
        query += 'WHERE id = ?';
        parameters.push(data.id);

        return new Promise((resolve, reject) => {
            db.run(query, parameters, function(err){
                if (err) {
                    reject(err);
                }
                else {
                    db.close(generalErrorHandler);
                    resolve(this.changes);
                }
            });
        });
    }

}

module.exports = Letter;