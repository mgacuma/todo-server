import { Server } from "./server/Server";

const dotenv = require('dotenv');
dotenv.config();

const server = new Server(process.env.PORT);