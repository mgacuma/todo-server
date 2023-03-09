import { Pool } from "pg";
import { Todo } from "../models/Todo.type";

import dotenv from 'dotenv'
dotenv.config();

export interface ITodosStore {
    pool: Pool;
    getTodos(): Promise<Todo[]>
    upsertTodo(todo: Todo): Promise<Todo>;
    toggleTodo(todo: Todo): Promise<Todo>;
    deleteTodo(todo: Todo): Promise<boolean>;
}

console.log(process.env.PG_URL)
export class TodosStore implements ITodosStore {
    pool: Pool;


    constructor(){
        this.pool = new Pool ({
            max: 20,
            connectionString: process.env.PG_URL,
            idleTimeoutMillis: 30000
        })
    }

    async getTodos() {
        try {
            const client = await this.pool.connect();

            const sql = "SELECT * FROM todos ORDER BY id DESC";
            const { rows } = await client.query(sql);
            const todos = rows;

            client.release();

            return todos as Todo[];
        } catch (error) {
            console.log(error)
        }
    }

    async upsertTodo(todo: Todo) {
        try {
            const client = await this.pool.connect();
            const { text, completed } = todo;

            const sql = `INSERT INTO todos (text, completed) VALUES ('${text}', '${completed}') RETURNING id, text, completed;`;
            const { rows } = await client.query(sql);

            client.release();

            return rows[0];
        } catch (error) {
            console.log(error)
        }
    }

    async toggleTodo(todo: Todo) {
        try {
            const client = await this.pool.connect();
            const { text, completed, id } = todo;

            const sql = `UPDATE todos SET completed = NOT completed WHERE id = ${id} RETURNING id, text, completed;`;
            const { rows } = await client.query(sql);

            client.release();

            return rows[0];
        } catch (error) {
            console.log(error)
        }
    }

    async deleteTodo(todo: Todo) {
        try {
            const client = await this.pool.connect();
            const { id } = todo;

            const sql = `DELETE FROM todos WHERE id=${id}`;
            const { rows } = await client.query(sql);

            client.release();

            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}

export const todosStore = new TodosStore();