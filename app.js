require('dotenv').config();

const express = require("express");
var axios = require("axios").default;
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const text = req.body.primaryText;
  const transToLanguage = req.body.transTo;

  var options = {
    method: "GET",
    url: "https://just-translated.p.rapidapi.com/",
    params: { lang: transToLanguage, text: text },
    headers: {
      "x-rapidapi-host": process.env.API_HOST,
      "x-rapidapi-key": process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const translatedObject = response.data;
      const translatedText = translatedObject.text[0];
      console.log(translatedText);
      res.send("The translated text is " + translatedText);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(8000, () => {
  console.log("server is up and running at port 8000");
});
