const {
    waterfall,
} = require('async');

const {
    User,
} = require('../model/user');
const config = require('../config');


const recordsOnPage = config.get('recordsOnPage');

exports.get = function (req, res) {
    console.log('req.query', req.query);

    const sortConfig = { [req.params.sort_by_field || '_id']: +req.params.direction || 1 };
    const filterData = req.query;


    let page = req.params.page || 1;
    let skipRecords = recordsOnPage * (page - 1);


    waterfall([
        (next) => {
            User.count(filterData, next);
        },
        (count, next) => {
            const pages = Math.ceil(count / recordsOnPage) || 1;
            if (skipRecords >= count) {
                skipRecords = (pages - 1) * recordsOnPage;
                page = pages;
            }
            res.set('Pagination-Count', pages);
            res.set('Page-Number', page);

            User.find(filterData)
                .sort(sortConfig)
                .skip(skipRecords)
                .limit(recordsOnPage)
                .exec(next);


        },
        (users) => {
            res.send(users);
        }
    ],
        (err) => {
            console.log(err);
        })
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
        () => {
            console.log('added');
            res.sendStatus(200);
        },
    ],
        (err) => {
            console.log('err', err);
            res.sendStatus(500);
        });

}

exports.delete = function (req, res) {
    const userId = req.params.id;

    waterfall([
        (next) => {
            User.deleteOne({
                '_id': userId,
            }, next)
        },
        () => {
            console.log('deleted');
            res.sendStatus(200);

        },
    ],
        (err) => {
            console.log('err', err);
            res.sendStatus(500);
        })
}