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

});