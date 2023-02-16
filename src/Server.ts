import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import todosRouter from './routers/TodosRouter';
import pool from './dbconfig/dbconnector';
import cors from 'cors';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        this.app.use(express.urlencoded({ extended:true }));
        this.app.use(express.json());
        this.app.use(cors({origin: 'https://mgacuma.github.io'}));
    }

    private dbConnect() {
        pool.connect(function (err: Error, client, done) {
            if (err) throw new Error(err.message);
            console.log('Connected');
          });
    }

    private routerConfig() {
        this.app.use('/todos', todosRouter);
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;