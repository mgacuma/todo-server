import { Server } from "./server/Server";
import dotenv from 'dotenv'
dotenv.config();

const server = new Server(process.env.PORT);