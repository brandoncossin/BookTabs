const express = require('express');
import axios from 'axios';
const app = express();

app.get('/', (req, res) => {
    //res.send({ hi: 'there my good friend'});
    const [book, setBook] = useState("");
const [result, setResult] = useState([]);
const [apiKey, setApiKey] = useState("AIzaSyBm-Omi3o6U4tNvT445DyT-eH4suqeDYTs");
    axios.get("https://www.googleapis.com/books/v1/volumes?q=The Stand&key=AIzaSyBm-Omi3o6U4tNvT445DyT-eH4suqeDYTs&maxResults=40")
    .then(data => {
      console.log(data.data.items);
      setResult(data.data.items);
    });
    res.send("Hello"+ data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);