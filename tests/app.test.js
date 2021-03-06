const request = require('supertest');
const chai = require('chai');

const appBuilder = require('../app');


const expect = chai.expect;

const letter = {
  "text": "Eu desejo um carinho de presente",
  "owner": "João da Silva",
};


describe('tests', () => {
    describe('POST /letter', () => {
        it('shoud create create a letter successfully', (done) => {
            const app = appBuilder();
            request(app.listen())
            .post('/letter')
            .send(letter)
            .end((err, res) => {
                if (err)
                return done(err);
                expect(res.statusCode).to.equal(200);
                expect(res.body).eql({'message': 'created'})
                done();
            });
        });
        it('shoud not create a letter ', (done) => {
            const app = appBuilder();
            const newLetter = Object.assign({}, letter);
            newLetter.text = null;
            request(app.listen())
            .post('/letter')
            .send(newLetter)
            .end((err, res) => {
                if (err)
                    return done(err);
                expect(res.statusCode).to.equal(400);
                expect(res.body).eql({'message': '"text" must be a string'})
                done();
            });
        });
    });
    describe('GET /letter', () => {
        it('shoud get one letter', (done) => {
            const app = appBuilder();
            const server = app.listen();

            request(server)
            .post('/letter')
            .send(letter)
            .end((err, res) => {
                if (err)
                    return done(err);

                request(server)
                .get('/letter/1773609a')
                .end((err2, res2) => {
                    if (err2)
                        done(err2);
                    expect(res2.statusCode).to.equal(200);
                    expect(res2.body.length).eql(0)
                    done();
                })

            });
        });

        it('shoud get many letters', (done) => {
            const app = appBuilder();
            const server = app.listen();

            request(server)
            .post('/letter')
            .send(letter)
            .end((err, res) => {
                if (err)
                    return done(err);

                request(server)
                .get('/letter')
                .end((err2, res2) => {
                    if (err2)
                        done(err2);
                    expect(res2.statusCode).to.equal(200);
                    expect(res2.body.length).gt(1)
                    done();
                })
            });
        });
    });

    describe('DELETE /letter/:id', () => {

        it('shoud delete a letter', (done) => {
            const app = appBuilder();
            const server = app.listen();

            request(server)
            .post('/letter')
            .send(letter)
            .end((err, res) => {
                if (err)
                    return done(err);

                request(server)
                .get('/letter')
                .end((err2, res2) => {
                    if (err2)
                        done(err2);
                    const letterId = res2.body[0].id;

                    request(server)
                    .delete(`/letter/${letterId}`)
                    .end((err3, res3) => {
                        if (err3)
                            done(err3);

                        expect(res3.statusCode).to.equal(200);
                        expect(res3.body).eql({'message': 'delete 1 registers'})
                        done();
                    });

                })
            });
        });
    });

    describe('PATCH /letter', () => {
        it('shoud update one letter', (done) => {
            const app = appBuilder();
            const server = app.listen();
            request(server)
            .post('/letter')
            .send(letter)
            .end((err, res) => {
                if (err)
                    return done(err);

                request(server)
                .get('/letter')
                .end((err2, res2) => {
                    if (err2)
                        done(err2);

                    const letterObj = res2.body[0];
                    const newLetter = {
                        id: letterObj.id,
                        text: letterObj.content + '. So mais uma coisa, boneco.',
                    }
                    request(server)
                    .patch('/letter')
                    .send(newLetter)
                    .end((err3, res3) => {
                        expect(res3.statusCode).to.equal(200);
                        expect(res3.body.message).eql('updated rows 1')
                        done();
                    });
                });
            });
        });
    });
});