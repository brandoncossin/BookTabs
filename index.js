const express = require('express');
const axios = require('axios')
const app = express();

app.get('/', (req, res) => {
    //res.send({ hi: 'there my good friend'});
    axios.get("https://www.googleapis.com/books/v1/volumes?q=The Stand&key=AIzaSyBm-Omi3o6U4tNvT445DyT-eH4suqeDYTs&maxResults=40")
    .then(data => {
      console.log(data.data.items);
      setResult(data.data.items);
    });
    res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);