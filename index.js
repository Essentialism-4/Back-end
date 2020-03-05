require('dotenv').config();

const server = require('./server.js');


//Dynamic PORT config ======================================================
const port = process.env.PORT || 6000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
// =========================================================================
