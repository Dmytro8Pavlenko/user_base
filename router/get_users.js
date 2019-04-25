const {
    waterfall,
} = require('async');

const {
    User,
} = require('../model/user');
const config = require('../config');


const recordsOnPage = config.get('recordsOnPage');

exports.post = function (req, res) {
    const page = req.body.page || 1;
    const sortConfig = req.body.sort_config || config.get('defaultSortConfig');

    let skipRecords = recordsOnPage * (page - 1);

    waterfall([
        (next) => {
            User.count({}, next);
        },
        (count, next) => {
            if (skipRecords <= count) {
                skipRecords = 0;
            }
            User.find({})
                .sort({
                    [sortConfig.sortField]: sortConfig.direction,
                })
                .skip(skipRecords)
                .limit(recordsOnPage)
                .exec(next);
            console.log('count', count);
        },
        (users)=>{
            res.send(users);
        },
    ])
}