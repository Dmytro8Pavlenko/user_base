const {
    waterfall,
} = require('async');

const {
    User,
} = require('../model/user');
//const config = require('../config');



exports.post = function (req, res) {
    const userData = req.body;
    console.log('userData', userData);

    waterfall([
        (next) => {
            const user = new User(userData);
            user.save(next);
        },
        (err) => {
            if (err) {
                console.log(err);
            };
            res.end();
        },
    ])
}