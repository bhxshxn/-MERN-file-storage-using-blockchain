const hash = require('object-hash');
const TARGET_HASH = 156;
module.exports.validProof = (proof) => {
    const guessHash = hash(proof);
    console.log('Hashing:', guessHash);
    return guessHash == hash(TARGET_HASH)
}

module.exports.proofOfWOrk = () => {
    var proof = 0;
    while (true) {
        if (!module.exports.validProof(proof)) {
            proof++;
        } else {
            break;
        }
    }
    return hash(proof);
}