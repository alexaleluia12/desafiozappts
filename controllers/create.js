const letterSchema = require('../models/letterSchema');
const LetterDB = require('../models/letterDB');

module.exports = async (req, resp) => {
    const data = req.body;

    const { value, error } = letterSchema.validate(req.body);
    if (error) {
        resp.status(400).json({
            'message': error.details[0].message,
        });
    } else {
        try {
            const letter = new LetterDB();
            await letter.store(value);
            resp.json({'message': 'created'})
        } catch (error) {
            console.log(error)
            return resp.status(500).send('Internal error');
        }
    }
};