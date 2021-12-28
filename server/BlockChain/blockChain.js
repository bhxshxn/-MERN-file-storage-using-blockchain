const hash = require('object-hash');
const valid = require('./valid')
const TARGET_HASH = hash(156);
const blockModel = require('../models/block')
class BlockChain {
    getLastBlock = async () => {
        const result = await blockModel.find({})
        return result[result.length - 1]
    }
    addNewBlock(title, location, user) {
        let block = {
            title: title,
            timestamp: Date.now(),
            location: location,
            user: user
        }
        if (valid.proofOfWOrk() == TARGET_HASH) {
            block.hash = hash(block);
            this.getLastBlock().then((result) => {
                if (result) {
                    block.prevHash = result.hash
                } else {
                    block.prevHash = null
                }
                const latestBlock = new blockModel(block)
                latestBlock
                    .save()
                    .then(() => {
                        console.log('new Block linked')
                    })
                    .catch((err) => console.log(err));
            })
        }
        return 'pass'
    }
}

module.exports = BlockChain;