const LetterDB = require('../models/letterDB');

module.exports = async (req, resp) => {
    const { letterId } = req.params;

    try {
        const letter = new LetterDB();
        const rowsDeleted = await letter.delete(letterId);
        resp.json({'message': `delete ${rowsDeleted} registers`});
    } catch (error) {
        console.log(error)
        return resp.status(500).send('Internal error');
    }
};