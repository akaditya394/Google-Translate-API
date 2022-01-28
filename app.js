const express = require('express');
const axios = require("axios").default;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));





app.listen(8000, () => {
    console.log("server is up and running at port 8000");
});