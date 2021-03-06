const letterSchemaUpdate = require('../models/letterSchemaUpdate');
const LetterDB = require('../models/letterDB');

module.exports = async (req, resp) => {
    const { value, error } = letterSchemaUpdate.validate(req.body);
    if (error) {
        resp.status(400).json({
            'message': error.details[0].message,
        });
    } else {
        try {
            const letter = new LetterDB();
            const numberUpdate = await letter.update(value);
            resp.json({'message': 'updated rows ' + numberUpdate});
        } catch (error) {
            console.log(error)
            return resp.status(500).send('Internal error');
        }
    }
};