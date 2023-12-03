const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    dev: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidato',
        required: true,
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true,
    },
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;