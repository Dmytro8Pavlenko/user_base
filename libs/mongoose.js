const mongoose = require('mongoose');

const config = require('../config');

const mongooseConfig = config.get('mongoose')

mongoose.connect(mongooseConfig.uri, mongooseConfig.config, (err) => {
    console.log(err);
});

module.exports = mongoose;