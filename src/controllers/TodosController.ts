
import pool from '../dbconfig/dbconnector';

class TodosController {

    public async getTodos(req, res) {
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM todos ORDER BY id DESC";
            const { rows } = await client.query(sql);
            const todos = rows;

            client.release();

            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async upsertTodo(req, res) {
        try {
            const client = await pool.connect();
            const { text, completed } = req.body;

            const sql = `INSERT INTO todos (text, completed) VALUES ('${text}', '${completed}') RETURNING id, text, completed;`;
            const { rows } = await client.query(sql);

            client.release();

            res.send(rows[0]);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async toggleTodo(req, res) {
        try {
            const client = await pool.connect();
            const { text, completed, id } = req.body;

            const sql = `UPDATE todos SET completed = NOT completed WHERE id = ${id} RETURNING id, text, completed;`;
            const { rows } = await client.query(sql);

            client.release();

            res.send(rows[0]);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async deleteTodos(req, res) {
        try {
            const client = await pool.connect();
            const { id } = req.body;

            const sql = `DELETE FROM todos WHERE id=${id}`;
            const { rows } = await client.query(sql);

            client.release();
            res.status(201).send();
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default TodosController;