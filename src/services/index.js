const { updateAmePlayersByMissionResult } = require('./ame-missoes');
const { getAmePontos } = require('./build-ame-list');
const {
    addPlayer,
    updatePlayerPoints,
    deletePlayer,
    getAll
} = require('./ame-services');

module.exports = {
    updateAmePlayersByMissionResult,
    getAmePontos,
    addPlayer,
    updatePlayerPoints,
    deletePlayer,
    getAll
}