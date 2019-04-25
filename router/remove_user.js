const {
    waterfall,
} = require('async');

const {
    User,
} = require('../model/user');
//const config = require('../config');



exports.post = function (req, res) {
    const userId = req.body.user_id;

    waterfall([
        (next) => {
            User.remove({
                '_id': userId,
            }, next)
        },
        (err) => {
            if (err) {
                console.log(err);
            };
            res.end();
        },
    ])
}