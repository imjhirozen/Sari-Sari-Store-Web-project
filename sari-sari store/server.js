const express = require('express');
const app = express();

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const htmlPath = require('./routes/path/htmlPath');
app.use('/', htmlPath);

const middleWare = require('./routes/middleWare/main');
app.use('/', middleWare);



app.use((req, res) => {
  res.status(404).send(`<h1>Error 404: Resource not found</h1>`);
});



// Start the server
const PORT = process.env.PORT || 8080;
const HOST = '192.168.86.32'; // change this to your ipv4 ip address

// latop ip 192.168.86.32
// pc ip 

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

