const express = require('express');
const formData = require("express-form-data");
const os = require("os");

const port = 8009;

const app = express();

app.use(express.static('public'));


const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

require('./router')(app);

app.listen(port, () => {
    console.log(`listening ${port}`);
});