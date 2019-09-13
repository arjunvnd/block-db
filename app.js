const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const Web3 = require('web3');

const api = require('./routes/api');
const PORT = require('./config/properties').PORT;
const database = require('./config/database');
const app = express();



app.use(express.static(path.join(__dirname,'front-end', 'dist','front-end')));
app.use(bodyParser.json());
app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/dist/front-end/index.html'));
});
  

app.listen(PORT, () => {
    console.log(`app running on port : ${PORT}!`)
})