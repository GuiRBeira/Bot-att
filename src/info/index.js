const { getKatana } = require('./katana-rules');
const { getContract } = require('./contract-rules');
const { getPShop, getPVile } = require('./points');
const { 
    getShopVile, 
    getShopRPG, 
    getMenuVila, 
    getFichaCompraAme, 
    getFichaCompraRPG 
} = require('./shop-vile');

const { getCronogram } = require('./cronogram-vile');
const { getFicha } = require('./ficha-rec');
const { getAmePonts } = require('../services/build-ame-list');

module.exports = {
    getKatana,
    getContract,
    getPShop,
    getPVile,
    getCronogram,
    getShopVile,
    getShopRPG,
    getMenuVila,
    getFichaCompraAme,
    getFichaCompraRPG,
    getFicha,
    getAmePonts
};