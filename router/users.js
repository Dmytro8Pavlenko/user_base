const {
    waterfall,
} = require('async');

const {
    User,
} = require('../model/user');
const config = require('../config');


const recordsOnPage = config.get('recordsOnPage');

exports.get = function (req, res) {
    console.log('req.params', req.params);

    const page = req.params.page || 1;
    const sortConfig = { [req.params.sort_by_field || '_id']: +req.params.direction || 1 };

    let skipRecords = recordsOnPage * (page - 1);

    console.log('[sortConfig.sortField]: sortConfig.direction', sortConfig);
    
    waterfall([
        (next) => {
            User.count({}, next);
        },
        (count, next) => {
            if (skipRecords >= count) {
                skipRecords = (Math.ceil(count / recordsOnPage) - 1) * recordsOnPage;
            }
            const pages = Math.ceil(count / recordsOnPage);
            res.set('Pagination-Count', pages);

            User.find({})
                .sort(sortConfig)
                .skip(skipRecords)
                .limit(recordsOnPage)
                .exec(next);
        },
        (users) => {
            res.send(users);
        },
    ])
}

exports.post = function (req, res) {
    const userData = req.body;
    waterfall([
        (next) => {
            User.create(
                userData, (err) => {
                    next(null, err);
                });

        },
        (waterfallErr, err) => {
            if (waterfallErr) {
                console.log('err', waterfallErr);
                res.sendStatus(500);
            } else {
                console.log('ok');
                res.sendStatus(200);
            }
        },
    ]);

}

exports.delete = function (req, res) {
    const userId = req.params.id;
    console.log('idForRemove', userId);

    waterfall([
        (next) => {
            User.deleteOne({
                '_id': userId,
            }, (err) => {
                next(null, err);
            })
        },
        (waterfallErr, err) => {
            if (waterfallErr) {
                console.log('err', waterfallErr);
                res.sendStatus(500);
            } else {
                console.log('ok');
                res.sendStatus(200);
            }
        },
    ])
}