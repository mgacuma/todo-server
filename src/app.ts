
import Server from './Server';

const dotenv = require('dotenv');
dotenv.config();

const port = parseInt(process.env.PORT);

const starter = new Server().start(port)
  .then(port => console.log(`Running on port ${port}`))
  .catch(error => {
    console.log(error)
  });

export default starter;