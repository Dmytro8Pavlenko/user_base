module.exports = function (app) {
   /*  app.get('/', (req, res) => {
        console.log('working');
    }); */

    app.get('/get_users', require('./get_users').post);
    app.post('/remove_user', require('./remove_user').post);
    app.post('/add_user', require('./add_user').post);
}