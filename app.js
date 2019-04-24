const express = require('express');

const port = 8009;

const app = express();

require('./router')(app);

app.listen(port, ()=>{
    console.log(`listening ${port}`);
});