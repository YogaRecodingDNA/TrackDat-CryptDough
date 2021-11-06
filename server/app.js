const config = require('./config/config');
const dbConnection = require('./config/database');
const app = require('express')();

dbConnection().then( () => {

    require('./config/express')(app);

    require('./config/routes')(app);
    
    app.listen(config.port, () => console.log(`Listening on PORT ${config.port}!`));

})
.catch(console.error);

