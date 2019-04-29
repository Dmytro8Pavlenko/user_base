const express = require('express');
var bodyParser = require('body-parser')

const config = require('./config');

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require('./router')(app);

app.listen(process.env.PORT || config.get("port"), () => {
    console.log(`listening ${process.env.PORT || config.get("port")}`);
});