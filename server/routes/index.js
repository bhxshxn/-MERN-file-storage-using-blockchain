const express = require('express');
const router = express.Router();
const BlockChain = require('../BlockChain/blockChain');
const blockChain = new BlockChain();
const multer = require('multer');
const blockModel = require('../models/block')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/public/imports/')
    },
    filename: (req, file, cb) => {
        cb(null, `${+Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage });

router.use('/user', require('./user.js'));
const cors = require('cors');

router.use(cors());


router.post('/public/upload', upload.single('file'), async (req, res) => {
    const result = await blockModel.find({ title: req.body.title });
    if (result) {
        fs.unlinksync('../public/imports/1632738496489-Screenshot (549).png', (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.status(201).send({ msg: "File title in use" })
    } else {
        blockChain.addNewBlock(req.body.title, `${req.file.destination}${req.file.filename}`, null)
        res.status(200).send(req.file)
    }
})

router.post('/public/searchfile', async (req, res) => {
    await blockModel.find({ title: req.body.title }).then((result) => {
        res.send(result).status(200)
    }).catch((err) => {
        res.send(err.msg).status(500)
    })
})

router.get('/download/:name', async (req, res) => {
    await blockModel.find({ title: req.params.name }).then((result) => {
        // console.log(result[0].location)
        res.download(result[0].location);
    }).catch((err) => {
        res.send(err.msg).status(500)
    })
});


module.exports = router;