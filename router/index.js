const path = require('path');

module.exports = function (app) {


    app.get('/users/:page/:sort_by_field/:direction', require('./users').get);
    app.delete('/users/:id', require('./users').delete);
    app.post('/users', require('./users').post);

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
        console.log('working');
    });
}