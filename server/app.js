const config = require('./config/config');

const app = require('express')();

app.get('/', (req, res) => { res.send('Trackdat Crypdough');});

app.listen(config.port, () => console.log(`Listening on PORT ${config.port}!`));