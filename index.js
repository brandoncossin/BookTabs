const express = require('express');
import axios from 'axios';
const app = express();

function getBook(){
const [book, setBook] = useState("");
const [result, setResult] = useState([]);
const [apiKey, setApiKey] = useState("AIzaSyBm-Omi3o6U4tNvT445DyT-eH4suqeDYTs");

axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=" + apiKey + "&maxResults=40")
    .then(data => {
      //console.log(data.data.items);
      setResult(data.data.items);
      res.send({ data});
    });
}
app.get('/', (req, res) => {
    //res.send({ hi: 'there my good friend'});
    const [book, setBook] = useState("");
const [result, setResult] = useState([]);
const [apiKey, setApiKey] = useState("AIzaSyBm-Omi3o6U4tNvT445DyT-eH4suqeDYTs");
    axios.get("https://www.googleapis.com/books/v1/volumes?q=The Stand&key=" + apiKey + "&maxResults=40")
    .then(data => {
      //console.log(data.data.items);
      setResult(data.data.items);
    });
    res.send({ data});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);