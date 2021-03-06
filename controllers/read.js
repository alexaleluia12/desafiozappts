const LetterDB = require('../models/letterDB');

module.exports = async (req, resp) => {
    const { letterId } = req.params;

    try {
        const letter = new LetterDB();
        const result = await letter.fetch(letterId);
        resp.json(result);
    } catch (error) {
        console.log(error)
        return resp.status(500).send('Internal error');
    }
};