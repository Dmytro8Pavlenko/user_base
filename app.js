const express = require('express');
var bodyParser = require('body-parser')

const port = 8009;

const app = express();

app.use(express.static('public'));




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


require('./router')(app);

app.listen(port, () => {
    console.log(`listening ${port}`);
});