const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user');
const blockModel = require('../models/block')
const BlockChain = require('../BlockChain/blockChain');
const blockChain = new BlockChain();
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/public/imports/')
    },
    filename: (req, file, cb) => {
        cb(null, `${+Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage });

router.use(cors());

router.get('/', (req, res) => {
    res.send("user")
})

router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    // check for missing filds
    if (!email || !password || !username) {
        res.send({ msg: "Please enter all the fields" })
        return;
    };
    var user = username.charAt(0).toUpperCase() + username.slice(1);

    const doesUserExitsAlreay = await User.findOne({ email });
    if (doesUserExitsAlreay) {
        res.send({ msg: "Email already exists" });
        return;
    };

    const doesUsernameExitsAlreay = await User.findOne({ username: user });
    if (doesUsernameExitsAlreay) {
        res.send({ msg: "Username already exists" });
        return;
    };

    // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword, username: user });

    latestUser
        .save()
        .then(() => {
            res.send({ msg: "Sucessfully Registered" });
            return;
        })
        .catch((err) => console.log(err));
});

router.post('/login', async (req, res) => {
    var { username, password } = req.body;

    // check for missing filds
    if (!username || !password) {
        res.send("Please enter all the fields");
        return;
    }
    username = username.charAt(0).toUpperCase() + username.slice(1);
    const doesUserExits = await User.findOne({ username });

    if (!doesUserExits) {
        res.send({ msg: "Invalid useranme or password" });
        return;
    }

    const doesPasswordMatch = await bcrypt.compare(
        password,
        doesUserExits.password
    );

    if (!doesPasswordMatch) {
        res.send({ msg: "Invalid useranme or password" });
        return;
    }
    res.send({ msg: "success", user: { username: username } });
})

router.post('/getfiles', async (req, res) => {
    await blockModel.find({ user: req.body.user }).then((result) => {
        res.send(result).status(200)
    }).catch((err) => {
        res.send(err.msg).status(500)
    })
})

router.post('/upload', upload.single('file'), (req, res) => {
    blockChain.addNewBlock(req.body.title, `${req.file.destination}${req.file.filename}`, req.body.user)
    res.status(200).send(req.file)
})

module.exports = router;