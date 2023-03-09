import express, { Application } from 'express';
import cors from 'cors';
import { Endpoint } from '../models/Endpoint.type';
import { endpoints } from '../endpoints/endpoints';

export interface IServer {
    app: Application
    config(): void;
    registerEndpoints(endpoints: Endpoint[]): void;
    start(port): void;
}

export class Server {
    private readonly app: Application;

    constructor(port) {
        this.app = express();
        this.init();
        this.registerEndpoints(endpoints);
        this.start(port);
    }

    private init() {
        this.app.use(express.urlencoded({ extended:true }));
        this.app.use(express.json());
        this.app.use(cors({origin: '*'}));
    }

    private registerEndpoints(endpoints: Endpoint[]){
        endpoints.forEach(endpoint => {
            this.app[endpoint.method](endpoint.url, endpoint.handler);
        })
    }

    private start(port) {
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    }
}